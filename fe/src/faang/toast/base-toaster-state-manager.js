/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { JSScheduler } from "@/faang/common";

import { XPlatReactToasterStateManager } from "./XPlat-react-toaster-state-manager";

function callbackScheduler(fn) {
  JSScheduler.scheduleNormalPriCallback(() => {
    fn();
  });
}

const CometMaxEnqueuedToastsSitevarConfig = {
  max: 2,
};

export const BaseToasterStateManager = {
  getInstance: function () {
    return XPlatReactToasterStateManager.getInstance({
      callbackScheduler: callbackScheduler,
      maxQueuedToasts: CometMaxEnqueuedToastsSitevarConfig.max,
    });
  },
  resetInstance_DO_NOT_USE: function () {
    XPlatReactToasterStateManager.resetInstance_DO_NOT_USE();
  },
};
