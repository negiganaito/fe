/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-sequences */

import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import getStyleProperty from "fbjs/lib/getStyleProperty";

import { RunComet } from "@/faang/common";
import {
  BaseViewportMarginsContext,
  HiddenSubtreePassiveContext,
} from "@/faang/context";
import { cometVisibilityUserActivityMonitor } from "@/faang/event-emitter";
import {
  getIntersectionMarginFromViewportMargin,
  intersectionObserverEntryIsIntersecting,
} from "@/faang/utils";

import { useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED } from "./use-double-effect-hack_DO_NOT_USE_THIS_IS_TRACKED";
import useIntersectionObserver from "./use-intersection-observer";

export function useViewportDuration(entry) {
  let b;
  let e;
  let f;
  // eslint-disable-next-line no-unused-vars
  let g = arguments;
  let o;
  let p;
  let q = entry.onHidden;
  let r = entry.onIntersection;
  let s = entry.onVisibilityDurationUpdated;
  let t = entry.onVisible;
  let u = entry.options;
  let v = u === void 0 ? {} : u;
  let w = entry.threshold;
  let x = (b = v.hiddenWhenZeroArea) !== null ? b : !1;
  let y = (e = v.hiddenWhenCSSStyleHidden) !== null ? e : !1;
  let z =
    (f = v.isEntryInViewport) !== null
      ? f
      : intersectionObserverEntryIsIntersecting;
  let A = useRef(null);
  let B = useRef(!1);
  let C = useRef(null);
  let D = useRef(null);
  let E = useRef(null);
  let F = useContext(HiddenSubtreePassiveContext);
  let G =
    v.activityMonitorOverride !== void 0
      ? v.activityMonitorOverride
      : cometVisibilityUserActivityMonitor;

  let H = useCallback(
    (a) => {
      if (G && !G.isUserActive()) return "USER_INACTIVE";
      let b = F.getCurrentState();
      if (b.hidden) return "PUSH_VIEW_HIDDEN";
      if (b.backgrounded) return "BACKGROUNDED";
      if (B.current === !1) return "NOT_IN_VIEWPORT";
      if (x === !0 && n(a)) return "TARGET_SIZE_0";
      if (y === !0) {
        b = m(a);
        if (b !== null) return b;
      }
      return null;
    },
    [G, F, y, x]
  );

  const I = useCallback(
    (a) => {
      return H(a) === null;
    },
    [H]
  );

  const J = useCallback(
    (a, b, c) => {
      let d = A.current !== null;
      if (!d && c) {
        let e = Date.now();
        // @ts-ignore
        A.current = e;
        t !== null &&
          b !== null &&
          t({
            entry: b,
            visibleTime: e,
          });
      } else if (d && !c) {
        d = (e = A.current) !== null ? e : 0;
        c = Date.now();
        if (q !== null) {
          e = a || (b && H(b)) || "UNKNOWN";
          q({
            entry: b,
            hiddenReason: e,
            hiddenTime: c,
            visibleDuration: c - d,
            visibleTime: d,
          });
        }
        A.current = null;
      }
    },
    [H, q, s, t]
  );

  const K = useRef(J);
  useLayoutEffect(() => {
    K.current = J;
  }, [J]);

  useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED(() => {
    return () => {
      K.current("COMPONENT_UNMOUNTED", null, false);

      if (C.current) {
        C.current();
        C.current = null;
      }

      if (E.current) {
        E.current();
        E.current = null;
      }

      if (D.current) {
        D.current();
        D.current = null;
      }

      // C.current && (C.current(), (C.current = null));
      // E.current && (E.current.remove(), (E.current = null));
      // D.current && (D.current.remove(), (D.current = null));
    };
    // @ts-ignore
  }, []);

  let L = useCallback(
    (a) => {
      // c('nullIntersectionObserverEntryLogger')(
      //   a,
      //   'IntersectionObserverEntry is null. num_arguments=' + g.length,
      // )
      let b = (B.current = z(a));
      r &&
        r({
          entry: a,
          isElementVisible: I(a),
        });
      C.current === null
        ? b &&
          ((C.current =
            G &&
            G.subscribe((b) => {
              return K.current("USER_INACTIVE", a, I(a));
            })),
          (E.current = F.subscribeToChanges((b) => {
            return K.current(
              b.hidden ? "PUSH_VIEW_HIDDEN" : "BACKGROUNDED",
              a,
              I(a)
            );
          })),
          // c('gkx')('5223') && D.current != null && D.current.remove(),
          (D.current = RunComet.onBeforeUnload((a) => {
            K.current("PAGE_UNLOAD", null, !1);
          }, !1)))
        : b ||
          (C.current !== null && (C.current(), (C.current = null)),
          E.current && (E.current.remove(), (E.current = null)),
          D.current !== null && (D.current.remove(), (D.current = null)));
      K.current(null, a, I(a));
    },
    [I, G, F, z, r]
  );

  const M = useContext(BaseViewportMarginsContext);

  const N = useMemo(() => {
    return {
      bottom: M.bottom + 1,
      left: M.left + 1,
      right: M.right + 1,
      top: M.top + 1,
    };
  }, [M.bottom, M.left, M.right, M.top]);

  const O = (o = v.root) !== null ? o : null;
  const P =
    (p = v.rootMargin) !== null
      ? p
      : getIntersectionMarginFromViewportMargin(N);

  return useIntersectionObserver(L, {
    root: O,
    rootMargin: P,
    threshold: w,
  });
}

const m = function (a) {
  if (a.target === null) {
    return null;
  }
  if (getStyleProperty(a.target, "opacity") === "0") {
    return "TARGET_TRANSPARENT";
  }
  return getStyleProperty(a.target, "visibility") === "hidden"
    ? "TARGET_HIDDEN"
    : null;
};

const n = function (a) {
  return (
    a.boundingClientRect &&
    (a.boundingClientRect.height === 0 || a.boundingClientRect.width === 0)
  );
};
