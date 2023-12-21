/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

/**
 *
 * @param {boolean} initialValue
 * @returns
 */
export function useDelayedState(initialValue) {
  const [state, setState] = useState(initialValue);
  const timeoutRef = useRef(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const setDelayedState = useCallback(
    /**
     * @param {boolean} newValue
     * @param { number | undefined} delay
     * @param {any | undefined} callback
     */
    (newValue, delay, callback) => {
      if (delay === undefined) {
        delay = 0;
      }

      if (callback === undefined) {
        callback = emptyFunction;
      }

      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;

      if (delay === 0) {
        setState(newValue);
        callback(newValue);
      } else {
        timeoutRef.current = setTimeout(() => {
          setState(newValue);
          callback(newValue);
          timeoutRef.current = undefined;
        }, delay);
      }
    },
    []
  );

  return [state, setDelayedState];
}
