/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Memoizes the return value of a function that accepts one string argument.
 */
function memoizeStringOnly(callback) {
  const cache = {};
  return function (string) {
    // eslint-disable-next-line no-prototype-builtins
    if (!cache.hasOwnProperty(string)) {
      // eslint-disable-next-line no-invalid-this
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;
