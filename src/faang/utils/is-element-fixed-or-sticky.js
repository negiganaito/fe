/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function isElementFixedOrSticky(a) {
  let b = a;
  while (b  && b !== a.ownerDocument) {
    let d = getComputedStyle(b);
    if (!d) return !1;
    d = d.getPropertyValue("position");
    if (d === "fixed" || d === "sticky") return !0;
    b = b.parentElement;
  }
  return !1;
}
