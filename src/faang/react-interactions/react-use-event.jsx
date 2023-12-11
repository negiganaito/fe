import { useLayoutEffect } from 'react';

import { useUnsafeRef_DEPRECATED } from '@/faang/hooks/use-unsafe-ref_DEPRECATED';

import { unstable_createEventHandle } from 'react-dom';

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

  if (handleRef.current === null) {
    var setEventHandle = unstable_createEventHandle(event, option);
    var clears = new Map();

    useEventHandle = {
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

        if (callback === null) {
          clears['delete'](target);
          return;
        }
        clear = setEventHandle(target, callback);
        clears.set(target, clear);
      },
      clear: () => {
        // var a = Array.from(clears.values())
        // for (var b = 0; b < a.length; b++) a[b]()
        // clears.clear()
        clears.forEach((c) => {
          c();
        });
        clears.clear();
      },
    };

    handleRef.current = useEventHandle;
  }

  useLayoutEffect(() => {
    return () => {
      if (useEventHandle !== null) {
        useEventHandle.clear();
      }
      handleRef.current = null;
    };
  }, [useEventHandle]);

  return useEventHandle;
}
