/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let g = Object.prototype.hasOwnProperty;

function createToJSEnum(a) {
  return function (b) {
    return !b || !g.call(a, b) ? null : a[b];
  };
}

let h = typeof WeakMap === "function" ? new WeakMap() : new Map();

function createFromJSEnum(a) {
  return function (b) {
    if (!b) return null;
    let c = h.get(a);
    !c &&
      ((c = new Map(
        Object.getOwnPropertyNames(a).map((b) => {
          return [a[b], b];
        })
      )),
      h.set(a, c));
    // eslint-disable-next-line no-return-assign, no-cond-assign
    return (c = c.get(b)) ? c : null;
  };
}

export const InternalEnumUtils = {
  createToJSEnum,
  createFromJSEnum,
};
