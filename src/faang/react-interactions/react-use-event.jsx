/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useLayoutEffect } from "react";
import { unstable_createEventHandle } from "react-dom";

import { useUnsafeRef_DEPRECATED } from "@/faang/hooks/use-unsafe-ref_DEPRECATED";

/**
 *
 * @param {string} event
 * @param {import("./types").EventOption} option
 * @returns {UseEventHandle}
 */
export function ReactUseEvent(event, option) {
  // TODO jsdoc with generic ref
  const handleRef = useUnsafeRef_DEPRECATED(null);

  let useEventHandle = handleRef.current;

  if (option) {
    option.passive = undefined;
  }

  if (!handleRef.current) {
    let setEventHandle = unstable_createEventHandle(event, option);
    let clears = new Map();

    useEventHandle = {
      clear: () => {
        // var a = Array.from(clears.values())
        // for (var b = 0; b < a.length; b++) a[b]()
        // clears.clear()
        clears.forEach((c) => {
          c();
        });
        clears.clear();
      },
      /**
       *
       * @param {EventTarget} target
       * @param {null | ((e: React.SyntheticEvent<EventTarget>) => void)} callback
       */
      setListener: (target, callback) => {
        let clear = clears.get(target);

        if (clear !== undefined) {
          clear();
        }

        if (!callback) {
          clears.delete(target);
          return;
        }
        clear = setEventHandle(target, callback);
        clears.set(target, clear);
      },
    };

    handleRef.current = useEventHandle;
  }

  useLayoutEffect(() => {
    return () => {
      if (useEventHandle) {
        useEventHandle.clear();
      }
      handleRef.current = null;
    };
  }, [useEventHandle]);

  return useEventHandle;
}
