/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-inner-declarations */
/* eslint-disable no-var */

import { JSScheduler } from "@/faang/common";

import { setTimeoutCometInternals } from "./set-timeout-comet-internals";

export function setTimeoutComet(a, b) {
  let c =
    JSScheduler.getCurrentPriorityLevel() ===
    JSScheduler.priorities.unstable_Idle
      ? JSScheduler.priorities.unstable_Idle
      : JSScheduler.priorities.unstable_Low;
  for (
    var e = arguments.length, f = new Array(e > 2 ? e - 2 : 0), g = 2;
    g < e;
    g++
  )
    f[g - 2] = arguments[g];
  return setTimeoutCometInternals.setTimeoutAtPriority_DO_NOT_USE.apply(
    setTimeoutCometInternals,
    [c, a, b].concat(f)
  );
}
