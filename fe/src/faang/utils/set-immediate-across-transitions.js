/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { TimeSlice } from "../common/time-slice";

import { setImmediatePolyfill } from "./set-immediate-polyfill";

export const setImmediateAcrossTransitions = (cb, ...args) => {
  const guard = TimeSlice.guard(cb, "setImmediate", {
    propagationType: TimeSlice.PropagationType.CONTINUATION,
    registerCallStack: true,
  });

  // for (
  //   // eslint-disable-next-line no-inner-declarations, no-var
  //   var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1;
  //   f < d;
  //   f++
  // ) {
  //   // eslint-disable-next-line no-undef
  //   e[f - 1] = arguments[f];
  // }

  // TODO
  return setImmediatePolyfill.apply(undefined, [guard].concat(args));
};
