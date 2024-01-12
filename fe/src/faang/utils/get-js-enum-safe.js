/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export function getJSEnumSafe(a, b) {
  if (!b) {
    return null;
  }
  if (!Object.prototype.hasOwnProperty.call(a, b)) {
    return null;
  }
  // eslint-disable-next-line no-self-assign
  b = b;
  return a[b];
}
