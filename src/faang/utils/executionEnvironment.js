/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export const isClient = () => typeof window !== "undefined";

const canUseDOM =
  isClient() &&
  !!(window !== undefined && window.document && window.document.createElement);

// @ts-ignore
const isInWorker = typeof WorkerGlobalScope === "function";

export const executionEnvironment = {
  canUseDOM,
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: isClient() && window && !!window.screen,
  canUseWorkers: typeof Worker !== "undefined",
  isInBrowser: (isClient() && window) || isInWorker,
  isInWorker,
};
