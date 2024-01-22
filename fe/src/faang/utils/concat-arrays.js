/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export function concatArrays(a) {
  let b;
  // eslint-disable-next-line no-return-assign
  return (b = []).concat.apply(b, a);
}
