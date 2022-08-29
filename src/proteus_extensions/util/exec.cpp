// Copyright 2021 Xilinx Inc.
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

#include "proteus_extensions/util/exec.hpp"

#include <array>         // for array
#include <cstdio>        // for pclose, fgets, popen, FILE
#include <memory>        // for unique_ptr
#include <string>        // for string
#include <system_error>  // for system_error

namespace proteus {

// TODO(varunsh): avoid popen
std::string exec(const char* cmd) {
  std::array<char, 128> buffer;  // NOLINT
  std::string result;
  // NOLINTNEXTLINE(cert-env33-c)
  std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), &pclose);
  if (!pipe) {
    throw std::system_error(EPIPE, std::generic_category(), "popen failed");
  }
  while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
    result += buffer.data();
  }
  return result;
}

}  // namespace proteus