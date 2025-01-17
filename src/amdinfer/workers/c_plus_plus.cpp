// Copyright 2023 Advanced Micro Devices, Inc.
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
 * @brief Implements the CPlusPlus worker
 */

#include <dlfcn.h>  // for dlopen

#include <array>    // for array
#include <cassert>  // for assert
#include <cstddef>  // for size_t, byte
#include <cstdint>  // for uint32_t, int32_t
#include <cstring>  // for memcpy
#include <memory>   // for unique_ptr, allocator
#include <ratio>    // for micro
#include <string>   // for string
#include <thread>   // for thread
#include <utility>  // for move
#include <vector>   // for vector

#include "amdinfer/batching/hard.hpp"    // for HardBatcher
#include "amdinfer/build_options.hpp"    // for AMDINFER_ENABLE_TRACING
#include "amdinfer/core/data_types.hpp"  // for DataType, DataType::Uint32
#include "amdinfer/core/inference_request.hpp"  // for InferenceRequest, Infe...
#include "amdinfer/core/inference_response.hpp"  // for InferenceResponse
#include "amdinfer/core/parameters.hpp"          // for ParameterMap
#include "amdinfer/declarations.hpp"         // for BufferPtr, InferenceRes...
#include "amdinfer/observation/logging.hpp"  // for Logger
#include "amdinfer/observation/metrics.hpp"  // for Metrics
#include "amdinfer/observation/tracing.hpp"  // for startFollowSpan, SpanPtr
#include "amdinfer/util/containers.hpp"      // for containerSum
#include "amdinfer/util/queue.hpp"           // for BufferPtrsQueue
#include "amdinfer/util/string.hpp"          // for endsWith
#include "amdinfer/util/thread.hpp"          // for setThreadName
#include "amdinfer/util/timer.hpp"           // for Timer
#include "amdinfer/workers/worker.hpp"       // for Worker

namespace amdinfer {

const int kInputTensors = 2;
const std::array<int, kInputTensors> kInputLengths = {1, 2};
const int kOutputTensors = 3;
const std::array<int, kOutputTensors> kOutputLengths = {1, 4, 3};

// TODO(varunsh): delete with duplicate in worker_info.cpp
void* openModel(const std::string& so_path) {
  if (so_path.empty()) {
    throw invalid_argument(".so path empty");
  }

  // reset errors
  dlerror();

  /*
  Open the needed object. The dlopen flags used here:
    - RTLD_LOCAL: the symbols are not made available to other loaded libs
    - RTLD_LAZY: resolve symbols as needed. We only need one anyway
  Adding RTLD_DEEPBIND here creates problems:
    - Cannot use std::cout in the library
      (https://gcc.gnu.org/bugzilla/show_bug.cgi?id=42679)
    - std::regex gives a segfault
  There are many SO posts reporting problems related to issues with DEEPBIND
  The motivation to add DEEPBIND is to isolate the loaded workers. For example,
  if the library is using a different version of a library that we are already
  using, it can link to the wrong version. Another option for isolating the
  workers is dlmopen but that also should not be used here due to its own set of
  issues (https://sourceware.org/bugzilla/show_bug.cgi?id=24776).
  */
  void* handle = dlopen(so_path.c_str(), RTLD_LOCAL | RTLD_LAZY);
  if (handle == nullptr) {
    const char* error_str = dlerror();
    throw file_not_found_error(error_str);
  }

  return handle;
}

void* getFunction(void* handle, const std::string& function) {
  /* find the address of function  */
  void* fptr = dlsym(handle, function.c_str());
  if (fptr == nullptr) {
    const char* error_str = dlerror();
    throw invalid_argument(error_str);
  }
  return fptr;
}

namespace workers {

/**
 * @brief The CPlusPlus worker can run a compiled C++ "model".
 *
 */
class CPlusPlus : public SingleThreadedWorker {
 public:
  using SingleThreadedWorker::SingleThreadedWorker;
  [[nodiscard]] std::vector<MemoryAllocators> getAllocators() const override;

 private:
  void doInit(ParameterMap* parameters) override;
  void doAcquire(ParameterMap* parameters) override;
  BatchPtr doRun(Batch* batch, const MemoryPool* pool) override;
  void doRelease() override;
  void doDestroy() override;

  void* handle_;
  std::vector<Tensor> input_tensors_;
  std::vector<Tensor> output_tensors_;

  // workers define what batcher implementation should be used for them.
  // if not explicitly defined here, a default value is used from worker.hpp.
  using Worker::makeBatcher;
  std::vector<std::unique_ptr<Batcher>> makeBatcher(int num,
                                                    ParameterMap* parameters,
                                                    MemoryPool* pool) override {
    return this->makeBatcher<HardBatcher>(num, parameters, pool);
  };
};

std::vector<MemoryAllocators> CPlusPlus::getAllocators() const {
  return {MemoryAllocators::Cpu};
}

void CPlusPlus::doInit(ParameterMap* parameters) {
  constexpr auto kBatchSize = 1;

  auto batch_size = kBatchSize;
  if (parameters->has("batch_size")) {
    batch_size = parameters->get<int32_t>("batch_size");
  }
  this->batch_size_ = batch_size;

  std::string model;
  if (parameters->has("model")) {
    model = parameters->get<std::string>("model");
  } else {
    throw invalid_argument("No model specified");
  }

  if (!util::endsWith(model, ".so")) {
    model = "lib" + model + ".so";
  }

  handle_ = openModel(model);
}

void CPlusPlus::doAcquire([[maybe_unused]] ParameterMap* parameters) {
  auto* input_ptr = getFunction(handle_, "getInputs");
  auto* getInputs =
    reinterpret_cast<std::vector<amdinfer::Tensor> (*)()>(input_ptr);
  input_tensors_ = getInputs();
  for (const auto& tensor : input_tensors_) {
    metadata_.addInputTensor(tensor);
  }

  auto* output_ptr = getFunction(handle_, "getOutputs");
  auto* getOutputs =
    reinterpret_cast<std::vector<amdinfer::Tensor> (*)()>(output_ptr);
  output_tensors_ = getOutputs();
  for (const auto& tensor : output_tensors_) {
    metadata_.addOutputTensor(tensor);
  }
}

BatchPtr CPlusPlus::doRun(Batch* batch, const MemoryPool* pool) {
  BatchPtr new_batch;
  if (!(input_tensors_.empty() || output_tensors_.empty())) {
    new_batch = batch->propagate();
    std::vector<BufferPtr> input_buffers;
    input_buffers.reserve(output_tensors_.size());
    const auto batch_size = batch->size();
    for (const auto& tensor : output_tensors_) {
      input_buffers.push_back(pool->get(next_allocators_, tensor, batch_size));
    }
    for (auto i = 0U; i < batch_size; ++i) {
      const auto& req = batch->getRequest(i);
      auto new_request = req->propagate();
      int index = 0;
      for (const auto& tensor : output_tensors_) {
        new_request->addInputTensor(InferenceRequestInput{tensor});
        new_request->setInputTensorData(
          index, input_buffers.at(index)->data(i * tensor.getSize() *
                                               tensor.getDatatype().size()));
        index++;
      }
      new_batch->addRequest(new_request);
    }
    new_batch->setBuffers(std::move(input_buffers), {});

    auto* run_ptr = getFunction(handle_, "run");
    auto* runModel =
      reinterpret_cast<void (*)(amdinfer::Batch*, amdinfer::Batch*)>(run_ptr);

    runModel(batch, new_batch.get());
  } else {
    auto* run_ptr = getFunction(handle_, "run");
    auto* runModel =
      reinterpret_cast<amdinfer::BatchPtr (*)(amdinfer::Batch*)>(run_ptr);

    new_batch = runModel(batch);
  }

  return new_batch;
}

void CPlusPlus::doRelease() {}
void CPlusPlus::doDestroy() { dlclose(handle_); }

}  // namespace workers

}  // namespace amdinfer

extern "C" {
// using smart pointer here may cause problems inside shared object so managing
// manually
amdinfer::workers::Worker* getWorker() {
  return new amdinfer::workers::CPlusPlus("CPlusPlus", "CPU", true);
}
}  // extern C
