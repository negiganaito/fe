/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import performanceNow from "fbjs/lib/performanceNow";

import { performanceNavigationStart } from "./performance-navigation-start";

let b = performanceNow();

function getCurrentQueueTime(a) {
  let d = null;
  let e =
    document.createEvent("MouseEvent").timeStamp < performanceNavigationStart();

  e && a && a < b && ((d = b - a), (b = a));
  return [b, d];
}

export const CometEventTimings = {
  getCurrentQueueTime,
};
