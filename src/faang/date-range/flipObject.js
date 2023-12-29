/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export function flipObject(a) {
  return Object.entries(a).reduce((b, c) => {
    let d = c[0];
    c = c[1];
    Object.prototype.hasOwnProperty.call(a, d) &&
      typeof c !== "object" &&
      typeof c !== "function" &&
      c &&
      (b[String(c)] = d);
    return b;
  }, {});
}
