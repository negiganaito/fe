/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { JSScheduler } from "@/faang/common";

/* eslint-disable no-inner-declarations */
/* eslint-disable func-name-matching */
/* eslint-disable no-var */

let i = new Map();
let j = 0;
function clearInterval_DO_NOT_USE(a) {
  if (a !== null) {
    let b = i.get(a);
    b !== void 0 &&
      (i["delete"](a), JSScheduler.cancelDelayedCallback_DO_NOT_USE(b));
  }
}
function clearTimeout_DO_NOT_USE(a) {
  if (a !== null) {
    let b = i.get(a);
    b !== void 0 &&
      (i["delete"](a), JSScheduler.cancelDelayedCallback_DO_NOT_USE(b));
  }
}
function setIntervalAtPriority_DO_NOT_USE(a, b, c) {
  for (
    var e = arguments.length, f = new Array(e > 3 ? e - 3 : 0), g = 3;
    g < e;
    g++
  )
    f[g - 3] = arguments[g];
  let k = j;
  j += 1;
  if (typeof b !== "function") return k;
  let l = function e() {
    let g = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(a, c, e);
    i.set(k, g);
    b.apply(void 0, f);
  };
  let m = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(a, c, l);
  i.set(k, m);
  return k;
}
function setTimeoutAtPriority_DO_NOT_USE(a, b, c) {
  for (
    var e = arguments.length, f = new Array(e > 3 ? e - 3 : 0), g = 3;
    g < e;
    g++
  )
    f[g - 3] = arguments[g];
  let k = j;
  j += 1;
  if (typeof b !== "function") return k;
  let l = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(a, c, () => {
    i["delete"](k);
    b.apply(void 0, f);
  });
  i.set(k, l);
  return k;
}

export const setTimeoutCometInternals = {
  clearInterval_DO_NOT_USE,
  clearTimeout_DO_NOT_USE,
  setIntervalAtPriority_DO_NOT_USE,
  setTimeoutAtPriority_DO_NOT_USE,
};
