/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ifRequired } from "./if-required";

export function ifRequireable(a, b, d) {
  // eslint-disable-next-line no-useless-call
  return ifRequired.call(null, a, b, d);
}
