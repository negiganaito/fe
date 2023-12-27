/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

let g = null;
function h(a) {
  g = a.matches;
}

export function getPrefersReducedMotion() {
  if (!g)
    if (typeof window.matchMedia === "function") {
      let a = matchMedia("(prefers-reduced-motion: reduce)");
      g = a.matches;
      a.addListener(h);
    } else {
      g = false;
    }
  return g;
}
