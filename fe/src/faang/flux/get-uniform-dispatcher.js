/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "invariant";

export function getUniformDispatcher(a) {
  (a && a.length) || invariant(0, 18238);
  a = a[0].getDispatcher();
  return a;
}
