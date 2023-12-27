/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function ifRequired(a, b, c) {
  let e;
  // BUG
  // d &&
  //   d.call(null, [a], function (a) {
  //     e = a;
  //   });
  if (e && b) return b(e);
  else if (!e && c) return c();
}
