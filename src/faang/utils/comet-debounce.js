/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export function CometDebounce(a, options = {}) {
  const { leading, wait } = options;
  let f = true;
  let g;

  function debouncedFunction(...args) {
    const k = () => {
      f = true;
      g = null;
    };

    if (leading === true) {
      k();
      if (!f) {
        clearTimeout(g);
        g = setTimeout(k, wait);
        return;
      }
      f = false;
      a(...args);
    } else {
      debouncedFunction.reset();
      k();
      g = setTimeout(() => {
        g = null;
        a(...args);
      }, wait);
    }
  }

  debouncedFunction.isPending = function () {
    return g !== null;
  };

  debouncedFunction.reset = function () {
    if (g) {
      clearTimeout(g);
      g = null;
    }
    f = true;
  };

  return debouncedFunction;
}
