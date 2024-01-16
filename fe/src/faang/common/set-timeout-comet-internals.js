/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable camelcase */

import { JSScheduler } from "./jss-scheduler";

const h = new Map();
let i = 0;

function clearInterval_DO_NOT_USE(a) {
  if (a) {
    let b = h.get(a);
    b !== void 0 &&
      (h["delete"](a), JSScheduler.cancelDelayedCallback_DO_NOT_USE(b));
  }
}

function clearTimeout_DO_NOT_USE(a) {
  if (a) {
    const b = h.get(a);
    b !== void 0 &&
      (h["delete"](a), JSScheduler.cancelDelayedCallback_DO_NOT_USE(b));
  }
}

function setIntervalAtPriority_DO_NOT_USE(a, b, c) {
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var e = arguments.length, f = new Array(e > 3 ? e - 3 : 0), g = 3;
    g < e;
    g++
  )
    f[g - 3] = arguments[g];
  const j = i;
  i += 1;
  if (typeof b !== "function") return j;
  // eslint-disable-next-line func-name-matching
  const k = function e() {
    let g = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(a, c, e);
    h.set(j, g);
    b.apply(void 0, f);
  };
  const l = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(a, c, k);
  h.set(j, l);
  return j;
}

function setTimeoutAtPriority_DO_NOT_USE(a, b, c) {
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var e = arguments.length, f = new Array(e > 3 ? e - 3 : 0), g = 3;
    g < e;
    g++
  )
    f[g - 3] = arguments[g];
  let j = i;
  i += 1;
  if (typeof b !== "function") return j;
  const k = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(a, c, () => {
    // eslint-disable-next-line no-sequences
    h["delete"](j), b.apply(void 0, f);
  });
  h.set(j, k);
  return j;
}

export const setTimeoutCometInternals = {
  clearInterval_DO_NOT_USE,
  clearTimeout_DO_NOT_USE,
  setIntervalAtPriority_DO_NOT_USE,
  setTimeoutAtPriority_DO_NOT_USE,
};
