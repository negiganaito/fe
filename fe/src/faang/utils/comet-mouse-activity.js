/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import removeFromArray from "fbjs/lib/removeFromArray";

let h = 50;
let i = [];
let j = [];
let k = null;

function l() {
  i.length > 0 &&
    i.forEach((a) => {
      return a();
      // eslint-disable-next-line no-sequences
    }),
    j.length > 0 &&
      (j.forEach((a) => {
        return a();
      }),
      (j = [])),
    (k = null);
}
function m() {
  // eslint-disable-next-line no-sequences
  clearTimeout(k),
    (k = setTimeout(() => {
      l();
    }, h));
}
let n = !1;

function init() {
  n || (window.addEventListener("mousemove", m), (n = !0));
  return function () {
    window.removeEventListener("mousemove", m);
  };
}

function addOnMouseStopCallback(a) {
  n || init();
  i.push(a);
  return function () {
    removeFromArray(i, a);
  };
}

function addOnMouseStopCallbackOnce(a) {
  n || init();
  j.push(a);
  return function () {
    removeFromArray(j, a);
  };
}

export const CometMouseActivity = {
  addOnMouseStopCallback: addOnMouseStopCallback,
  addOnMouseStopCallbackOnce: addOnMouseStopCallbackOnce,
  init: init,
};
