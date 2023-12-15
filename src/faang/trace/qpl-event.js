/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function getMarkerId(a) {
  return a.i;
}
function getSampleRate(a) {
  return (a = a.r) != null ? a : 0;
}
function getSamplingMethod(a) {
  return (a = a.m) != null ? a : 1;
}

export const QPLEvent = {
  getMarkerId,
  getSampleRate,
  getSamplingMethod,
};
