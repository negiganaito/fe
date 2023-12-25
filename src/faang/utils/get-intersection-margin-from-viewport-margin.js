/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const g = new Map();
export function getIntersectionMarginFromViewportMargin(a) {
  let b =
    "bottom:" +
    a.bottom +
    "|top:" +
    a.top +
    "|left:" +
    a.left +
    "|right:" +
    a.right;
  let c = g.get(b);
  c === null &&
    ((c = {
      bottom: a.bottom * -1,
      left: a.left * -1,
      right: a.right * -1,
      top: a.top * -1,
    }),
    g.set(b, c));
  return c;
}
