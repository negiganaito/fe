/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";

import { LayoutAnimationEvent } from "@/faang/common";

import {
  BaseContextualLayerAnchorRootContext,
  BaseContextualLayerAvailableHeightContext,
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
  BaseLinkNestedPressableContext,
  BaseScrollableAreaContext,
  BaseViewportMarginsContext,
  CometTextContext,
  HiddenSubtreeContext,
  LayoutAnimationBoundaryContext,
} from "../context";
import { BasePortal } from "../dialog";
import { FocusRegion, focusScopeQueries } from "../focus-region";
import {
  mergeRefs_Legacy,
  useLayoutAnimationEvents,
  useResizeObserver,
} from "../hooks";
import { BaseContextualLayerAnchorRoot } from "../modal";
import {
  calculateBaseContextualLayerPosition,
  isElementFixedOrSticky,
} from "../utils";

import { BaseContextualLayerDefaultContainer } from "./base-contextual-layer-default-container";

function t(a) {
  a = a.getBoundingClientRect();
  return {
    bottom: a.bottom,
    left: a.left,
    right: a.right,
    top: a.top,
  };
}
function u(a) {
  // eslint-disable-next-line no-return-assign
  return (a =
    (a = a[a.length - 1]) === null
      ? void 0
      : (a = a.getDOMNode()) === null
      ? void 0
      : a.scrollTop) !== null
    ? a
    : window.pageYOffset;
}
function v(a) {
  let b = getComputedStyle(a);
  return b !== null && b.getPropertyValue("position") !== "static"
    ? a
    : (a instanceof HTMLElement && a.offsetParent) ||
        a.ownerDocument.documentElement;
}
let w = 8;
function aa(a, b) {
  return a.bottom < b.top ||
    b.bottom < a.top ||
    a.right < b.left ||
    b.right < b.left
    ? null
    : {
        bottom: Math.min(a.bottom, b.bottom),
        left: Math.max(a.left, b.left),
        right: Math.min(a.right, b.right),
        top: Math.max(a.top, b.top),
      };
}
let x = Locale.isRTL();
let ba = stylex.create({
  root: {
    left: "0",
    marginRight: "-9999px",
    position: "absolute",
    top: "0",
    start: null,
    end: null,
    marginStart: null,
    marginEnd: null,
  },
});
function ca(a) {
  return {
    adjustment: null,
    availableHeight: null,
    contextSize: null,
    isPositionIndeterminate: !1,
    position: a,
  };
}
function da(a, b) {
  let c;
  switch (b.type) {
    case "determine_direction":
      if (a.position !== b.position || a.availableHeight !== b.availableHeight)
        return {
          ...a,
          availableHeight: b.availableHeight,
          position: b.position,
        };
      break;
    case "reposition":
      if (
        a.adjustment !== b.adjustment ||
        ((c = a.contextSize) === null ? void 0 : c.height) !==
          ((c = b.contextSize) === null ? void 0 : c.height) ||
        ((c = a.contextSize) === null ? void 0 : c.width) !==
          ((c = b.contextSize) === null ? void 0 : c.width)
      )
        return {
          ...a,
          adjustment: b.adjustment,
          contextSize: b.contextSize,
          isPositionIndeterminate: !1,
        };
      break;
    case "position_indeterminate":
      return { ...a, isPositionIndeterminate: !0 };
    case "position_changed":
      if (a.position !== b.position) return { ...a, position: b.position };
      break;
  }
  return a;
}

function _BaseContextualLayer(a, b) {
  let e = a.align;
  let f = e === void 0 ? "start" : e;
  e = a.disableAutoAlign;
  let g = e === void 0 ? !1 : e;
  e = a.children;
  let h = a.containFocus;
  h = h === void 0 ? !1 : h;
  let i = a.customContainer;
  i = i === void 0 ? BaseContextualLayerDefaultContainer : i;
  let y = a.disableAutoFlip;
  let z = y === void 0 ? !1 : y;
  y = a.hidden;
  y = y === void 0 ? !1 : y;
  let A = a.imperativeRef;
  let ea = a.onEscapeFocusRegion;
  let B = a.onIndeterminatePosition;
  let fa = a.presencePayload;
  let C = a.position;
  let D = C === void 0 ? "below" : C;
  C = a.restoreFocus;
  C = C === void 0 ? !0 : C;
  let E = a.stopClickPropagation;
  E = E === void 0 ? !1 : E;
  let ga = a.xstyle;
  // let F = babelHelpers.objectWithoutPropertiesLoose(a, [
  //   "align",
  //   "disableAutoAlign",
  //   "children",
  //   "containFocus",
  //   "customContainer",
  //   "disableAutoFlip",
  //   "hidden",
  //   "imperativeRef",
  //   "onEscapeFocusRegion",
  //   "onIndeterminatePosition",
  //   "presencePayload",
  //   "position",
  //   "restoreFocus",
  //   "stopClickPropagation",
  //   "xstyle",
  // ]);

  const {
    align,
    disableAutoAlign,
    children,
    containFocus,
    customContainer,
    disableAutoFlip,
    hidden,
    imperativeRef,
    onEscapeFocusRegion,
    onIndeterminatePosition,
    presencePayload,
    position,
    restoreFocus,
    stopClickPropagation,
    xstyle,
    ...F
  } = a;

  a = useReducer(da, D, ca);
  let G = a[0];
  let ha = G.adjustment;
  let ia = G.availableHeight;
  let ja = G.contextSize;
  let H = G.isPositionIndeterminate;
  let I = G.position;
  let J = a[1];
  let K = useContext(BaseContextualLayerAnchorRootContext);
  let L = useContext(BaseScrollableAreaContext);
  let M = useContext(BaseViewportMarginsContext);
  let N = useContext(LayoutAnimationBoundaryContext);
  G = useState(!1);
  a = G[0];
  let O = G[1];
  G = useContext(HiddenSubtreeContext);
  G = G.hidden;
  let P = G || y;
  let Q = useRef(null);
  let R = useRef(null);
  let S = useCallback(() => {
    return !F.context_DEPRECATED && F.contextRef
      ? F.contextRef.current
      : F.context_DEPRECATED;
  }, [F.contextRef, F.context_DEPRECATED]);
  let T = useCallback(() => {
    let a = document.documentElement;
    if (a === null) return;
    return {
      bottom: a.clientHeight - M.bottom - w,
      left: M.left + w,
      right: a.clientWidth - M.right - w,
      top: M.top + w,
    };
  }, [M.bottom, M.left, M.right, M.top]);
  // eslint-disable-next-line complexity
  let U = useCallback(() => {
    let a = Q.current;
    let b = S();
    let c = T();
    if (a === null || b === null || c === null) return;
    b = t(b);
    a = t(a);
    let d = a.bottom - a.top;
    a = a.right - a.left;
    let e = x ? "start" : "end";
    let f = x ? "end" : "start";
    let g = I;
    let h = null;
    z ||
      (I === "above" || I === "below"
        ? I === "above" && b.top - d < c.top && b.bottom + d < c.bottom
          ? (g = "below")
          : I === "above" && u(L) + b.top < d
          ? (g = "below")
          : I === "below" &&
            b.bottom + d > c.bottom &&
            b.top - d > c.top &&
            (g = "above")
        : (I === "start" || I === "end") &&
          (I === f && b.left - a < c.left && b.right + a < c.right
            ? (g = e)
            : I === e &&
              b.right + a > c.right &&
              b.left - a > c.left &&
              (g = f)));
    g === "above" || g === "below"
      ? (h = g === "above" ? b.top - c.top : c.bottom - b.bottom)
      : (g === "start" || g === "end") &&
        (h = Math.max(c.bottom, b.bottom) - Math.min(b.top, c.top));
    R.current = {
      height: d,
      width: a,
    };
    J({
      availableHeight: h,
      position: g,
      type: "determine_direction",
    });
  }, [S, T, z, I]);
  let V = useCallback(() => {
    let a = document.documentElement;
    let b = K.current;
    let d = T();
    let e = S();
    if (a === null || b === null || d === null || e === null) return;
    let h = v(b);
    if (h === null) return;
    b = isElementFixedOrSticky(b);
    b = !b && e.nodeType === 1 && isElementFixedOrSticky(e);
    e = L.map((a) => {
      return a.getDOMNode();
    })
      .filter(Boolean)
      .filter((a) => {
        return h.contains(a);
      })
      .reduce((a, b) => {
        return a !== null ? aa(a, t(b)) : null;
      }, t(e));
    if (e === null || (e.left === 0 && e.right === 0)) {
      J({
        type: "position_indeterminate",
      });
      B && B();
      return;
    }
    a = b
      ? {
          bottom: a.clientHeight,
          left: 0,
          right: a.clientWidth,
          top: 0,
        }
      : t(h);
    b = calculateBaseContextualLayerPosition({
      align: f,
      contextRect: e,
      contextualLayerSize: g ? null : R.current,
      fixed: b,
      offsetRect: a,
      position: I,
      screenRect: d,
    });
    a = b.adjustment;
    d = b.style;
    b = Q.current;
    if (b !== null) {
      let i = Object.keys(d);
      for (let j = 0; j < i.length; j++) {
        let k = i[j];
        let l = d[k];
        l !== null ? b.style.setProperty(k, l) : b.style.removeProperty(k);
      }
    }
    J({
      adjustment: a,
      contextSize: {
        height: e.bottom - e.top,
        width: e.right - e.left,
      },
      type: "reposition",
    });
  }, [K, T, S, L, g, f, I, B]);
  let W = useCallback(
    (a) => {
      a === LayoutAnimationEvent.LayoutAnimationEventType.Start && O(!0),
        a === LayoutAnimationEvent.LayoutAnimationEventType.Stop &&
          (O(!1), V());
    },
    [V, O]
  );
  useLayoutEffect(() => {
    N &&
      N.getIsAnimating() &&
      W(LayoutAnimationEvent.LayoutAnimationEventType.Start);
  }, [N, W]);
  useLayoutAnimationEvents(W);
  useImperativeHandle(
    A,
    () => {
      return {
        reposition: function (a) {
          if (!P) {
            a = a || {};
            a = a.autoflip;
            a = a === void 0 ? !1 : a;
            a && U();
            V();
          }
        },
      };
    },
    [P, V, U]
  );
  let X = useResizeObserver((a) => {
    let b = a.height;
    a = a.width;
    R.current = {
      height: b,
      width: a,
    };
    V();
  });
  let Y = useRef(D);
  useLayoutEffect(() => {
    D !== Y.current &&
      (J({
        position: D,
        type: "position_changed",
      }),
      P || (U(), V()),
      (Y.current = D));
  });
  let Z = useCallback(
    (a) => {
      (Q.current = a), !a && !P && (U(), V());
    },
    [P, V, U]
  );
  useEffect(() => {
    if (P) return;
    let a = function () {
      U(), V();
    };
    window.addEventListener("resize", a);
    return function () {
      window.removeEventListener("resize", a);
    };
  }, [P, V, U]);
  useEffect(() => {
    if (P) return;
    let a = L.map((a) => {
      return a.getDOMNode();
    }).filter(Boolean);
    if (a.length > 0) {
      a.forEach((a) => {
        return a.addEventListener("scroll", V, {
          passive: !0,
        });
      });
      return function () {
        a.forEach((a) => {
          return a.removeEventListener("scroll", V, {
            passive: !0,
          });
        });
      };
    }
  }, [P, V, L]);
  useEffect(() => {
    if (!window.addEventListener || P) return;
    window.addEventListener("scroll", V, {
      passive: !0,
    });
    return function () {
      window.removeEventListener("scroll", V, {
        passive: !0,
      });
    };
  }, [P, V]);
  G = useMemo(() => {
    return mergeRefs_Legacy(Z, X, b); // TODO
  }, [Z, X, b]);
  A = useMemo(() => {
    return {
      align: f,
      position: I,
    };
  }, [f, I]);
  let $ = y || H;
  return jsx(BasePortal, {
    target: K.current,
    children: jsx(i, {
      hidden: y || H || a,
      presencePayload: fa,
      ref: G,
      stopClickPropagation: E,
      testid: void 0,
      xstyle: [ba.root, ga],
      children: jsx(FocusRegion.FocusRegion, {
        autoFocusQuery:
          !$ && h
            ? focusScopeQueries.headerFirstTabbableSecondScopeQuery
            : null,
        autoRestoreFocus: !$ && C,
        containFocusQuery:
          !$ && h ? focusScopeQueries.tabbableScopeQuery : null,
        onEscapeFocusRegion: ea,
        recoverFocusQuery: $
          ? null
          : focusScopeQueries.headerFirstTabbableSecondScopeQuery,
        children: jsx(BaseContextualLayerAnchorRoot, {
          children: jsx(BaseContextualLayerContextSizeContext.Provider, {
            value: ja,
            children: jsx(BaseContextualLayerLayerAdjustmentContext.Provider, {
              value: ha,
              children: jsx(
                BaseContextualLayerAvailableHeightContext.Provider,
                {
                  value: ia,
                  children: jsx(
                    BaseContextualLayerOrientationContext.Provider,
                    {
                      value: A,
                      children: jsx(BaseLinkNestedPressableContext.Provider, {
                        value: !1,
                        children: jsx(CometTextContext.Provider, {
                          value: null,
                          children: e,
                        }),
                      }),
                    }
                  ),
                }
              ),
            }),
          }),
        }),
      }),
    }),
  });
}

export const BaseContextualLayer_Legacy = forwardRef(_BaseContextualLayer);
