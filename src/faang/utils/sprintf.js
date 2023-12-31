/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function sprintf(formatString, ...args) {
  let currentIndex = 0;

  return formatString.replace(/%s/g, () => String(args[currentIndex++]));
}
