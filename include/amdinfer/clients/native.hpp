// Copyright 2021 Xilinx, Inc.
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
 * @brief Defines the methods for interacting with the server in the native C++
 * API
 */

#ifndef GUARD_AMDINFER_CLIENTS_NATIVE
#define GUARD_AMDINFER_CLIENTS_NATIVE

#include <string>  // for string
#include <vector>  // for vector

#include "amdinfer/clients/client.hpp"    // IWYU pragma: export
#include "amdinfer/core/predict_api.hpp"  // for InferenceRequest (ptr only) const
#include "amdinfer/declarations.hpp"      // for InferenceResponseFuture

// IWYU pragma: no_forward_declare amdinfer::RequestParameters

namespace amdinfer {

class NativeClient : public Client {
 public:
  ServerMetadata serverMetadata() const override;
  bool serverLive() const override;
  bool serverReady() const override;

  /**
   * @brief Check if a worker is ready
   *
   * @param worker name of the worker to check if ready
   */
  bool modelReady(const std::string& model) const override;

  ModelMetadata modelMetadata(const std::string& model) const override;

  /**
   * @brief Load a worker
   *
   * @param model name of the worker to load
   * @param parameters any load-time parameters to pass to the worker
   * @return std::string the qualified name of the worker to make inference
   * requests
   */
  void modelLoad(const std::string& model,
                 RequestParameters* parameters) const override;
  /**
   * @brief Unload a worker
   *
   * @param worker name of the worker to unload
   */
  void modelUnload(const std::string& model) const override;

  InferenceResponse modelInfer(const std::string& model,
                               const InferenceRequest& request) const override;
  /**
   * @brief Enqueue an inference request
   *
   * @param workerName name of the worker to make the request to
   * @param request the request to make
   * @return InferenceResponseFuture a future to get the results of the request
   */
  InferenceResponseFuture modelInferAsync(
    const std::string& workerName,
    const InferenceRequest& request) const override;
  std::vector<std::string> modelList() const override;

  std::string workerLoad(const std::string& worker,
                         RequestParameters* parameters) const override;
  void workerUnload(const std::string& worker) const override;

  bool hasHardware(const std::string& name, int num) const override;
};

}  // namespace amdinfer

#endif  // GUARD_AMDINFER_CLIENTS_NATIVE