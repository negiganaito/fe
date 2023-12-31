/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ErrorGuard } from "@/faang/error";
import { env } from "@/faang/utils";

import { IntervalTrackingBoundedBuffer } from "./interval-tracking-bounded-buffer";

// __d("TimeSliceSham", ["Env", "ErrorGuard", "IntervalTrackingBoundedBuffer"], (function(a, b, c, d, e, f) {

let c = env.timesliceBufferSize ?? 5e3;

const intervalTrackingBoundedBuffer = new IntervalTrackingBoundedBuffer(c);
export const TimeSlice = {
  PropagationType: {
    CONTINUATION: 0,
    EXECUTION: 1,
    ORPHAN: 2,
  },
  guard: function (a, c, d) {
    return ErrorGuard.guard(a, {
      name: "TimeSlice" + (c ? ": " + c : ""),
    });
  },
  copyGuardForWrapper: function (a, b) {
    return a;
  },
  checkCoverage: function () {},
  setLogging: function (a, b) {},
  getContext: function () {
    return null;
  },
  getGuardedContinuation: function (a) {
    function a(a) {
      for (
        // eslint-disable-next-line no-inner-declarations, no-var
        var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
        d < b;
        d++
      )
        c[d - 1] = arguments[d];
      // eslint-disable-next-line no-invalid-this
      return a.apply(this, c);
    }
    return a;
  },
  getReusableContinuation: function (a) {
    return TimeSlice.getPlaceholderReusableContinuation();
  },
  getPlaceholderReusableContinuation: function () {
    let a = function (a) {
      return a();
    };
    a.last = a;
    return a;
  },
  getGuardNameStack: function () {
    return [];
  },
  registerExecutionContextObserver: function (a) {},
  catchUpOnDemandExecutionContextObservers: function (a) {},
  getBuffer: function () {
    return intervalTrackingBoundedBuffer;
  },
};
