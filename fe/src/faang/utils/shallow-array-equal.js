/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { isNullish } from "./is-nullish";

export function shallowArrayEqual(a, b) {
  if (a === b) return !0;
  if (isNullish(a) || isNullish(b) || a.length !== b.length) return !1;
  for (let d = 0, e = a.length; d < e; d++) if (a[d] !== b[d]) return !1;
  return !0;
}
