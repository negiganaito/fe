/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import performance from 'fbjs/lib/performance';

let b;
  let i = function () {
    return Date.now();
  };
function a(a) {
  i = a;
}
if (
  performance.now &&
  performance.timing &&
  performance.timing.navigationStart
) {
  let j = performance.timing.navigationStart;
  b = function () {
    return performance.now() + j;
  };
} else
  b = function () {
    return i();
  };
b.setFallback = a;

export const performanceAbsoluteNow = b;
