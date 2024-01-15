/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import performance from "fbjs/lib/performance";

export function performanceNavigationStart() {
  let a;
  // eslint-disable-next-line no-restricted-globals
  let h = typeof window !== "undefined" ? window : self;

  if (performance.now)
    if (performance.timing && performance.timing.navigationStart)
      a = function () {
        return performance.timing.navigationStart;
      };
    else {
      if (typeof h._cstart === "number")
        a = function () {
          return h._cstart;
        };
      else {
        let i = Date.now();
        a = function () {
          return i;
        };
      }
      a.isPolyfilled = !0;
    }
  else
    (a = function () {
      return 0;
    }),
      (a.isPolyfilled = !0);

  return a;
}
