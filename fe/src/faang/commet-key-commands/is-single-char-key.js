/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let singleCharRegex = /^[a-z0-9/]$/;

export function isSingleCharKey(key) {
  return key ? singleCharRegex.test(key) : false;
}
