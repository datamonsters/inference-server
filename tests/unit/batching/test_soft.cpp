// Copyright 2022 Xilinx Inc.
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

#include <memory>  // for allocator

#include "gtest/gtest.h"                 // for Test, SuiteApiResolver, TEST
#include "proteus/batching/soft.hpp"     // for SoftBatcher
#include "proteus/core/interface.hpp"    // IWYU pragma: keep
#include "proteus/core/worker_info.hpp"  // for WorkerInfo

namespace proteus {

TEST(UnitSoftBatcher, ConstructAndStart) {
  SoftBatcher batcher;
  batcher.setName("test");

  WorkerInfo fake("", nullptr);
  batcher.start(&fake);

  batcher.enqueue(nullptr);
  batcher.end();
}

}  // namespace proteus
