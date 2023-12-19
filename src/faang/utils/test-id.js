/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function testID(value, require = true) {
  return require && value !== null
    ? {
        "data-testid": value,
      }
    : undefined;
}
