/**
 * Memoizes a function based on its arguments using a keyExtractor function.
 *
 * @param {Function} computation - The function to be memoized.
 * @param {Function} keyExtractor - A function that generates a unique key for each set of arguments.
 * @param {any} context - The context in which the functions are executed.
 * @returns {Function} - The memoized function.
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
