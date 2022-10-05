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

#ifndef GUARD_SRC_PROTEUS_TESTING_OBSERVATION
#define GUARD_SRC_PROTEUS_TESTING_OBSERVATION

#include "proteus/build_options.hpp"
#include "proteus/observation/observer.hpp"
#include "proteus/util/string.hpp"

namespace proteus {

void initializeTestLogging() {
#ifdef PROTEUS_ENABLE_LOGGING
  LogOptions options{
    "test",  // logger_name
    getLogDirectory(),
    true,             // enable file logging
    LogLevel::kInfo,  // file log level
    true,             // enable console logging
    LogLevel::kWarn   // console log level
  };
  initLogger(options);
#endif
}

}  // namespace proteus

#endif  // GUARD_SRC_PROTEUS_TESTING_OBSERVATION