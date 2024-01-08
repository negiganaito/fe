/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// eslint-disable-next-line no-unused-vars
export function memoizeWithArgs(computation, keyExtractor, context) {
  let cache;

  // TODO replace with spread operator

  /**
   * @function
   * @name memoizedFunction
   * @description Memoized version of the computation function.
   * @param {...any} args - The arguments passed to the computation function.
   * @returns {any} - The result of the computation function.
   */
  const memoizedFunction = (...args) => {
    cache || (cache = {});
    const key = keyExtractor(...args);

    if (!Object.prototype.hasOwnProperty.call(cache, key)) {
      cache[key] = computation(...args);
    }

    return cache[key];
  };

  return memoizedFunction;
}
