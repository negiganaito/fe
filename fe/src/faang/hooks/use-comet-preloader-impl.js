/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useEffect, useRef } from "react";

import { JSScheduler, setTimeoutCometInternals } from "../common";
import { CometMouseActivity } from "../utils";
// eslint-disable-next-line camelcase

function isMousePointerType(a) {
  return a.pointerType === "mouse";
}
function conditionallyInvokeOrPreload(a) {
  a && (typeof a === "function" ? a() : a.preload());
}

const m = 50;

// eslint-disable-next-line max-params
export function useCometPreloaderImpl(a, b, d, e) {
  const f = useRef(null);
  const g = useRef(null);
  const n = useRef(null);
  const o = function (a) {
    // c('ifRequired')(
    //   'setTimeoutCometInternals',
    //   function (b) {
    //     f.current = b.setTimeoutAtPriority_DO_NOT_USE(
    //       c('JSScheduler').priorities.unstable_UserBlocking,
    //       a,
    //       m,
    //     )
    //   },
    //   function () {
    //     f.current = c('setTimeout')(a, m)
    //   },
    // )
    f.current = setTimeoutCometInternals.setTimeoutAtPriority_DO_NOT_USE(
      JSScheduler.priorities.unstable_UserBlocking,
      a,
      m
    );
  };
  const p = useCallback(
    (e, f, g) => {
      if (
        a === "tooltip" ||
        ((a === "button" || a === "button_aggressive") && b)
      ) {
        e = () => {
          if (a === "tooltip") {
            conditionallyInvokeOrPreload(d);
            conditionallyInvokeOrPreload(b);
            // c('Bootloader').forceFlush()
          } else if (a === "button" || a === "button_aggressive") {
            conditionallyInvokeOrPreload(b);
            // c('Bootloader').forceFlush()
          }

          f && f();

          // a === 'tooltip'
          //   ? (l(d), l(b), c('Bootloader').forceFlush())
          //   : (a === 'button' || a === 'button_aggressive') &&
          //     (l(b), c('Bootloader').forceFlush()),
          //   f && f()
        };
        o(e);
      }
      if (a === "button_aggressive") {
        e = function () {
          conditionallyInvokeOrPreload(d);
          g && g();
        };
        n.current && (n.current(), (n.current = null));
        n.current = CometMouseActivity.addOnMouseStopCallbackOnce(e);
      }
    },
    [d, b, a]
  );

  const q = useCallback(() => {
    clearTimeout(f.current);
    f.current = null;
    e && e();
    g.current && g.current();
    n.current && n.current();
  }, [e]);

  const r = useCallback(
    (b) => {
      if (!isMousePointerType(b)) {
        return;
      }

      if (a === "button" || a === "button_aggressive") {
        conditionallyInvokeOrPreload(d);
        // c('Bootloader').forceFlush()
      }

      // ;(a === 'button' || a === 'button_aggressive') &&
      //   (l(d), c('Bootloader').forceFlush())
    },
    [d, a]
  );
  const s = useCallback(
    (a) => {
      JSScheduler.scheduleSpeculativeCallback(() => {
        if (a) {
          conditionallyInvokeOrPreload(d);
          conditionallyInvokeOrPreload(b);
          // c('Bootloader').forceFlush()
        }
        // a === !0 && (l(d), l(b), c('Bootloader').forceFlush())
      });
    },
    [d, b]
  );

  useEffect(() => {
    return function () {
      g.current && g.current();
      n.current && n.current();
      clearTimeout(f.current);
    };
  }, []);

  return [p, q, r, s];
}
