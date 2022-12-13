// Copyright 2022 Advanced Micro Devices, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file
 * @brief Implements the PtZendnn worker
 */

#include <torch/script.h>  // for IValue, Tensor, Device

#include <algorithm>   // for copy
#include <chrono>      // for duration, operator-
#include <cstddef>     // for size_t, byte
#include <cstdint>     // for int32_t, uint64_t
#include <cstring>     // for memcpy
#include <exception>   // for exception
#include <filesystem>  // for path, exists, filesystem
#include <functional>  // for multiplies
#include <memory>      // for unique_ptr, allocator
#include <numeric>     // for accumulate
#include <ratio>       // for milli, micro
#include <string>      // for string, operator+, to_s...
#include <thread>      // for thread
#include <utility>     // for move
#include <vector>      // for vector

#include "amdinfer/batching/hard.hpp"          // for Batch, BatchPtrQueue
#include "amdinfer/buffers/vector_buffer.hpp"  // for VectorBuffer
#include "amdinfer/build_options.hpp"          // for AMDINFER_ENABLE_LOGGING
#include "amdinfer/core/data_types.hpp"        // for DataType, DataType::FP32
#include "amdinfer/core/exceptions.hpp"        // for external_error, file_no...
#include "amdinfer/core/predict_api.hpp"       // for InferenceResponse, Requ...
#include "amdinfer/declarations.hpp"           // for InferenceResponseOutput
#include "amdinfer/observation/logging.hpp"    // for Logger, AMDINFER_LOG_INFO
#include "amdinfer/observation/metrics.hpp"    // for Metrics, MetricCounterIDs
#include "amdinfer/observation/tracing.hpp"    // for Trace
#include "amdinfer/util/thread.hpp"            // for setThreadName
#include "amdinfer/workers/worker.hpp"         // for Worker, kNumBufferAuto

namespace fs = std::filesystem;

uint64_t reduce_mult(std::vector<uint64_t>& v) {
  return std::accumulate(v.begin(), v.end(), 1, std::multiplies<>());
}

namespace amdinfer {

namespace workers {

/**
 * @brief The PtZendnn worker is a simple worker that accepts a single uint32_t
 * argument and adds 1 to it and returns. It accepts multiple input tensors and
 * returns the corresponding number of output tensors.
 *
 */
class PtZendnn : public Worker {
 public:
  using Worker::Worker;
  std::thread spawn(BatchPtrQueue* input_queue) override;

 private:
  void doInit(RequestParameters* parameters) override;
  size_t doAllocate(size_t num) override;
  void doAcquire(RequestParameters* parameters) override;
  void doRun(BatchPtrQueue* input_queue) override;
  void doRelease() override;
  void doDeallocate() override;
  void doDestroy() override;

  // workers define what batcher implementation should be used for them.
  // if not explicitly defined here, a default value is used from worker.hpp.
  // using Worker::makeBatcher;
  // std::vector<std::unique_ptr<Batcher>> makeBatcher(
  //   int num, RequestParameters* parameters) override {
  //   return this->makeBatcher<HardBatcher>(num, parameters);
  // };

  // Load the model here
  torch::jit::script::Module model;

  // Image properties
  unsigned image_width_, image_height_, image_channels_, image_size_;
  unsigned output_classes_;

  DataType input_dt_ = DataType::FP32;
};

std::thread PtZendnn::spawn(BatchPtrQueue* input_queue) {
  return std::thread(&PtZendnn::run, this, input_queue);
}

void PtZendnn::doInit(RequestParameters* parameters) {
  constexpr auto kMaxBufferNum = 64;
  constexpr auto kBatchSize = 1;

  auto max_buffer_num = kMaxBufferNum;
  if (parameters->has("max_buffer_num"))
    max_buffer_num = parameters->get<int32_t>("max_buffer_num");
  this->max_buffer_num_ = max_buffer_num;

  auto batch_size = kBatchSize;
  if (parameters->has("batch_size"))
    batch_size = parameters->get<int32_t>("batch_size");
  this->batch_size_ = batch_size;

  // Image properties
  unsigned kTotalClasses = 1000;
  unsigned kImageWidth = 224;
  unsigned kImageHeight = 224;
  unsigned kImageChannels = 3;

  if (parameters->has("input_size")) {
    image_height_ = parameters->get<int32_t>("input_size");
    image_width_ = parameters->get<int32_t>("input_size");
  } else {
    image_height_ = kImageWidth;
    image_width_ = kImageHeight;
  }
  if (parameters->has("image_channels"))
    image_channels_ = parameters->get<int32_t>("image_channels_");
  else
    image_channels_ = kImageChannels;
  image_size_ = image_height_ * image_width_ * image_channels_;

  if (parameters->has("output_classes"))
    output_classes_ = parameters->get<int32_t>("output_classes");
  else
    output_classes_ = kTotalClasses;
}

size_t PtZendnn::doAllocate(size_t num) {
  constexpr auto kBufferNum = 10U;
  size_t buffer_num =
    static_cast<int>(num) == kNumBufferAuto ? kBufferNum : num;

  VectorBuffer::allocate(this->input_buffers_, buffer_num,
                         image_size_ * this->batch_size_, input_dt_);
  VectorBuffer::allocate(this->output_buffers_, buffer_num,
                         output_classes_ * this->batch_size_, DataType::FP32);
  return buffer_num;
}

void PtZendnn::doAcquire(RequestParameters* parameters) {
#ifdef AMDINFER_ENABLE_LOGGING
  const auto& logger = this->getLogger();
#endif

  if (!parameters->has("model")) {
    throw invalid_argument("Model not provided in load-time parameters");
  }
  fs::path path = parameters->get<std::string>("model");
  if (!path.has_extension()) {
    path.replace_extension(".pt");
  }

  if (!fs::exists(path)) {
    throw file_not_found_error("Model " + path.string() + " does not exist");
  }

  // Load the model
  torch::jit::Module torch_module;
  try {
    torch_module = torch::jit::load(path, torch::kCPU);
  } catch (const c10::Error& e) {
    AMDINFER_LOG_ERROR(logger, e.what());
    throw file_read_error("Could not load model with torch");
  }

  AMDINFER_LOG_INFO(logger, "Model loaded");

  // Some online optimizations for the model
  torch_module.eval();
  try {
    torch_module = torch::jit::optimize_for_inference(torch_module);
  } catch (const std::exception& e) {
    AMDINFER_LOG_ERROR(logger, e.what());
    throw external_error("Unable to perform optimizations");
  }
  AMDINFER_LOG_INFO(logger, "Model Optimized, Ready for prediction");

  this->model = torch_module;

  // Adding metadata for input and output
  this->metadata_.addInputTensor(
    "input", input_dt_,
    {this->batch_size_, image_height_, image_width_, image_channels_});
  this->metadata_.addOutputTensor("output", DataType::FP32, {0});
  this->metadata_.setName("PtZendnn");
}

void PtZendnn::doRun(BatchPtrQueue* input_queue) {
  std::unique_ptr<Batch> batch;
  util::setThreadName("PtZendnn");
#ifdef AMDINFER_ENABLE_LOGGING
  const auto& logger = this->getLogger();
#endif

  while (true) {
    input_queue->wait_dequeue(batch);
    if (batch == nullptr) {
      break;
    }
    AMDINFER_LOG_DEBUG(logger, "Got request in PtZendnn. Size: " +
                                 std::to_string(batch->size()));

    std::vector<InferenceResponse> responses;
    responses.reserve(batch->size());

    // This ensures no gradient is calculated and provide performance boost
    torch::NoGradGuard no_grad;
    c10::InferenceMode guard;

    size_t input_size = 0;
    std::vector<torch::jit::IValue> input_vec;
    auto tensors = static_cast<int>(batch->size());

    // Initialize a PT tensor with required shape
    torch::Tensor input_tensor = torch::empty(
      {tensors, image_channels_, image_height_, image_width_}, torch::kF32);

#ifdef AMDINFER_ENABLE_METRICS
    Metrics::getInstance().incrementCounter(
      MetricCounterIDs::kPipelineIngressWorker);
#endif
    size_t vec_size = 0;
    auto TotalStart = std::chrono::high_resolution_clock::now();
    for (unsigned int j = 0; j < batch->size(); j++) {
      const auto& req = batch->getRequest(j);

#ifdef AMDINFER_ENABLE_TRACING
      const auto& trace = batch->getTrace(j);
      trace->startSpan("ptzendnn");
#endif
      auto& resp = responses.emplace_back();
      resp.setID(req->getID());
      resp.setModel("PTModel");

      auto inputs = req->getInputs();
      auto outputs = req->getOutputs();
      AMDINFER_LOG_DEBUG(logger,
                         "Size of input: " + std::to_string(inputs.size()));

      // Get all the inputs from the requests and copy to the PT tensor
      for (const auto& input : inputs) {
        auto* input_buffer = input.getData();
        auto input_shape = input.getShape();
        input_size = reduce_mult(input_shape);

        auto* floatBuffer = static_cast<float*>(input_buffer);
        std::copy(floatBuffer, floatBuffer + input_size,
                  input_tensor.data_ptr<float>() + vec_size);
        vec_size = vec_size + input_size;
      }
    }

    // Create the inputs and output tensor
    input_vec.push_back(input_tensor);
    c10::IValue prediction;

    // Run through the model to get the predictions
    auto start = std::chrono::high_resolution_clock::now();
    try {
      prediction = this->model.forward(input_vec);
    } catch (const c10::Error& e) {
      AMDINFER_LOG_ERROR(logger, "Model not suported/Issue with the model");
      for (const auto& req : *batch) {
        req->runCallbackError("Something went wrong");
      }
    }

    auto stop = std::chrono::high_resolution_clock::now();
    {
      std::chrono::duration<float, std::milli> duration = stop - start;
      float time_tmp = duration.count();
      AMDINFER_LOG_INFO(logger, "Time taken for " +
                                  std::to_string(batch->size()) +
                                  " images: " + std::to_string(time_tmp));
    }
    at::Tensor output_tensor;
    if (!prediction.isTuple()) {
      output_tensor = prediction.toTensor();
    } else {
      // For some models like InceptionV3 and GoogleNet which returns Tuple
      output_tensor = prediction.toTuple()->elements()[0].toTensor();
    }

    // Copy the output from the model to the response object
    size_t response_size = output_classes_;
    std::vector<size_t> new_shape = {response_size};
    for (unsigned int k = 0; k < batch->size(); k++) {
      const auto& req = batch->getRequest(k);
      auto inputs = req->getInputs();
      auto outputs = req->getOutputs();
      auto& resp = responses[k];

      for (unsigned int i = 0; i < inputs.size(); i++) {
        InferenceResponseOutput output;
        std::vector<std::byte> buffer;
        buffer.resize(response_size * sizeof(float));

        memcpy(buffer.data(), output_tensor[i].data_ptr<float>(),
               response_size * sizeof(float));
        output.setData(std::move(buffer));

        std::string output_name = outputs[i].getName();
        if (output_name.empty()) {
          output.setName(inputs[i].getName());
        } else {
          output.setName(output_name);
        }

        output.setShape(new_shape);
        output.setDatatype(DataType::FP32);
        resp.addOutput(output);
      }

#ifdef AMDINFER_ENABLE_TRACING
      auto context = batch->getTrace(k)->propagate();
      resp.setContext(std::move(context));
#endif

      auto TotalStop = std::chrono::high_resolution_clock::now();
      std::chrono::duration<float, std::milli> d = TotalStop - TotalStart;
      float tt = d.count();
      AMDINFER_LOG_DEBUG(logger, "Total time taken: " + std::to_string(tt));

      req->runCallbackOnce(resp);

#ifdef AMDINFER_ENABLE_METRICS
      auto now = std::chrono::high_resolution_clock::now();
      std::chrono::duration<double, std::micro> duration =
        now - batch->getTime(k);
      Metrics::getInstance().observeSummary(MetricSummaryIDs::kRequestLatency,
                                            duration.count());
#endif
    }
  }
  AMDINFER_LOG_INFO(logger, "PtZendnn ending");
}

void PtZendnn::doRelease() {}
void PtZendnn::doDeallocate() {}
void PtZendnn::doDestroy() {}

}  // namespace workers

}  // namespace amdinfer

extern "C" {
// using smart pointer here may cause problems inside shared object so managing
// manually
amdinfer::workers::Worker* getWorker() {
  return new amdinfer::workers::PtZendnn("PtZendnn", "cpu");
}
}  // extern C