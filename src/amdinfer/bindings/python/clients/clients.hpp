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
 * @brief Defines the objects for Python bindings
 */

#ifndef GUARD_AMDINFER_BINDINGS_PYTHON_CLIENTS_CLIENTS
#define GUARD_AMDINFER_BINDINGS_PYTHON_CLIENTS_CLIENTS

#include "amdinfer/build_options.hpp"

namespace pybind11 {
class module_;
}  // namespace pybind11

namespace amdinfer {

void wrapClient(pybind11::module_ &);
void wrapNativeClient(pybind11::module_ &);
#ifdef AMDINFER_ENABLE_HTTP
void wrapHttpClient(pybind11::module_ &);
void wrapWebSocketClient(pybind11::module_ &);
#endif
#ifdef AMDINFER_ENABLE_GRPC
void wrapGrpcClient(pybind11::module_ &);
#endif

void inline wrapClients(pybind11::module_ &m) {
  wrapClient(m);
  wrapNativeClient(m);
#ifdef AMDINFER_ENABLE_HTTP
  wrapHttpClient(m);
  wrapWebSocketClient(m);
#endif
#ifdef AMDINFER_ENABLE_GRPC
  wrapGrpcClient(m);
#endif
}

}  // namespace amdinfer

#endif  // GUARD_AMDINFER_BINDINGS_PYTHON_CLIENTS_CLIENTS
