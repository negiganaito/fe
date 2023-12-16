/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let g = 'js_'
let h = 36
let i = 0;

export function uniqueID(a, b) {
  a === undefined && (a = g);
  b === undefined && (b = !1);
  return b ? a : a + (i++).toString(h)
}
