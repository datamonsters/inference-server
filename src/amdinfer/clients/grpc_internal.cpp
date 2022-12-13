// Copyright 2022 Xilinx, Inc.
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
 * @brief Implements the internal objects used for gRPC
 */

#include "amdinfer/clients/grpc_internal.hpp"

#include <google/protobuf/repeated_ptr_field.h>  // for RepeatedPtrField

#include <cstddef>   // for size_t
#include <cstdint>   // for int16_t, int32_t
#include <iostream>  // for operator<<, cout
#include <memory>    // for make_shared, shared...
#include <vector>    // for vector, _Bit_reference

#include "amdinfer/core/data_types.hpp"            // for DataType, mapTypeToStr
#include "amdinfer/core/predict_api_internal.hpp"  // for RequestParameters
#include "amdinfer/declarations.hpp"               // for InferenceResponseOu...
#include "amdinfer/observation/observer.hpp"       // for kNumTraceData
#include "amdinfer/util/traits.hpp"                // for is_any
#include "predict_api.pb.h"                        // for ModelInferResponse_...

namespace amdinfer {

void mapProtoToParameters(
  const google::protobuf::Map<std::string, inference::InferParameter>& params,
  RequestParameters* parameters) {
  using ParameterType = inference::InferParameter::ParameterChoiceCase;
  for (const auto& [key, value] : params) {
    auto type = value.parameter_choice_case();
    switch (type) {
      case ParameterType::kBoolParam: {
        parameters->put(key, value.bool_param());
        break;
      }
      case ParameterType::kInt64Param: {
        // TODO(varunsh): parameters should switch to uint64?
        parameters->put(key, static_cast<int>(value.int64_param()));
        break;
      }
      case ParameterType::kDoubleParam: {
        parameters->put(key, value.double_param());
        break;
      }
      case ParameterType::kStringParam: {
        parameters->put(key, value.string_param());
        break;
      }
      default: {
        // if not set
        break;
      }
    }
  }
}

RequestParametersPtr mapProtoToParameters(
  const google::protobuf::Map<std::string, inference::InferParameter>& params) {
  auto parameters = std::make_shared<RequestParameters>();
  mapProtoToParameters(params, parameters.get());

  return parameters;
}

void mapProtoToParameters(
  const google::protobuf::Map<std::string, inference::InferParameter>& params,
  RequestParameters& parameters) {
  mapProtoToParameters(params, &parameters);
}

// refer to cppreference for std::visit
// helper type for the visitor #4
template <class... Ts>
struct overloaded : Ts... {
  using Ts::operator()...;
};
// explicit deduction guide (not needed as of C++20)
template <class... Ts>
overloaded(Ts...) -> overloaded<Ts...>;

void mapParametersToProto(
  const std::map<std::string, amdinfer::Parameter>& parameters,
  google::protobuf::Map<std::string, inference::InferParameter>*
    grpc_parameters) {
  for (const auto& [key, value] : parameters) {
    inference::InferParameter param;
    std::visit(
      overloaded{[&](bool arg) { param.set_bool_param(arg); },
                 [&](double arg) { param.set_double_param(arg); },
                 [&](int32_t arg) { param.set_int64_param(arg); },
                 [&](const std::string& arg) { param.set_string_param(arg); }},
      value);
    grpc_parameters->insert({key, param});
  }
}

struct AddDataToTensor {
  template <typename T, typename Tensor>
  void operator()(const void* source_data, size_t size, Tensor* tensor,
                  const Observer& observer) const {
    const auto* data = static_cast<const T*>(source_data);
    auto* contents = getTensorContents<T>(tensor);

    if constexpr (std::is_same_v<T, char>) {
      contents->Add(data);
    } else if constexpr (std::is_same_v<T, fp16>) {
      for (auto i = 0U; i < size; ++i) {
        contents->Add(static_cast<float>(data[i]));
      }
    } else {
      for (auto i = 0U; i < size; ++i) {
#ifdef AMDINFER_ENABLE_LOGGING
        const auto min_size = size > kNumTraceData ? kNumTraceData : size;
        if (i < min_size) {
          AMDINFER_LOG_TRACE(observer.logger, "Adding data to tensor: " +
                                                std::to_string(data[i]));
        }
#endif
        contents->Add(data[i]);
      }
    }
  }
};

void mapRequestToProto(const InferenceRequest& request,
                       inference::ModelInferRequest& grpc_request,
                       [[maybe_unused]] const Observer& observer) {
  AMDINFER_LOG_TRACE(observer.logger,
                     "Mapping the InferenceRequest to proto object");
  grpc_request.set_id(request.getID());

  if (const auto* parameters = request.getParameters(); parameters != nullptr) {
    auto params = parameters->data();
    auto* grpc_parameters = grpc_request.mutable_parameters();
    mapParametersToProto(params, grpc_parameters);
  }

  const auto& inputs = request.getInputs();
  for (const auto& input : inputs) {
    auto* tensor = grpc_request.add_inputs();

    tensor->set_name(input.getName());
    const auto& shape = input.getShape();
    auto size = 1U;
    for (const auto& index : shape) {
      tensor->add_shape(index);
      size *= index;
    }
    auto datatype = input.getDatatype();
    tensor->set_datatype(datatype.str());
    mapParametersToProto(input.getParameters()->data(),
                         tensor->mutable_parameters());

    switchOverTypes(AddDataToTensor(), input.getDatatype(), input.getData(),
                    input.getSize(), tensor, observer);
  }

  // TODO(varunsh): skipping outputs for now
}

struct SetOutputData {
  template <typename T, typename Tensor>
  void operator()(InferenceResponseOutput* output, size_t size, Tensor* tensor,
                  const Observer& observer) const {
    std::vector<std::byte> data;
    const auto bytes_to_copy = size * sizeof(T);
    data.resize(bytes_to_copy);
    const auto* contents = getTensorContents<T>(tensor);
    if constexpr (std::is_same_v<T, char>) {
      std::memcpy(data.data(), contents, size * sizeof(std::byte));
      output->setData(std::move(data));
    } else {
      if constexpr (util::is_any_v<T, int8_t, uint8_t, int16_t, uint16_t,
                                   fp16>) {
        for (auto i = 0U; i < size; ++i) {
          std::memcpy(&(data[i * sizeof(T)]), &(contents[i]), sizeof(T));
        }
      } else {
        std::memcpy(data.data(), contents, bytes_to_copy);
      }
      output->setData(std::move(data));
    }

    logTraceBuffer(observer.logger, output->getData(), sizeof(T));
  }
};

void mapProtoToResponse(const inference::ModelInferResponse& reply,
                        InferenceResponse& response, const Observer& observer) {
  response.setModel(reply.model_name());
  response.setID(reply.id());

  for (const auto& tensor : reply.outputs()) {
    InferenceResponseOutput output;
    output.setName(tensor.name());
    output.setDatatype(DataType(tensor.datatype().c_str()));
    std::vector<uint64_t> shape;
    shape.reserve(tensor.shape_size());
    auto size = 1U;
    for (const auto& index : tensor.shape()) {
      shape.push_back(static_cast<size_t>(index));
      size *= index;
    }
    output.setShape(shape);
    // TODO(varunsh): skipping parameters for now
    switchOverTypes(SetOutputData(), output.getDatatype(), &output, size,
                    &tensor, observer);
    response.addOutput(output);
  }
}

void mapResponseToProto(InferenceResponse response,
                        inference::ModelInferResponse& reply) {
  Observer observer;
  AMDINFER_IF_LOGGING(observer.logger = Logger{Loggers::kServer});

  AMDINFER_LOG_TRACE(observer.logger,
                     "Mapping the InferenceResponse to proto object");
  reply.set_model_name(response.getModel());
  reply.set_id(response.getID());
  auto outputs = response.getOutputs();
  for (const InferenceResponseOutput& output : outputs) {
    auto* tensor = reply.add_outputs();
    tensor->set_name(output.getName());
    // auto* parameters = tensor->mutable_parameters();
    tensor->set_datatype(output.getDatatype().str());
    const auto& shape = output.getShape();
    auto size = 1U;
    for (const size_t& index : shape) {
      tensor->add_shape(index);
      size *= index;
    }

    switchOverTypes(AddDataToTensor(), output.getDatatype(), output.getData(),
                    output.getSize(), tensor, observer);
  }
}

void mapModelMetadataToProto(const ModelMetadata& metadata,
                             inference::ModelMetadataResponse& resp) {
  resp.set_name(metadata.getName());
  resp.set_platform(metadata.getPlatform());

  const auto& inputs = metadata.getInputs();
  for (const auto& input : inputs) {
    auto* tensor = resp.add_inputs();
    tensor->set_name(input.getName());
    tensor->set_datatype(input.getDataType().str());
    const auto& shape = input.getShape();
    for (const auto& i : shape) {
      tensor->add_shape(i);
    }
  }
  const auto& outputs = metadata.getOutputs();
  for (const auto& output : outputs) {
    auto* tensor = resp.add_outputs();
    tensor->set_name(output.getName());
    tensor->set_datatype(output.getDataType().str());
    const auto& shape = output.getShape();
    for (const auto& i : shape) {
      tensor->add_shape(i);
    }
  }
}

}  // namespace amdinfer