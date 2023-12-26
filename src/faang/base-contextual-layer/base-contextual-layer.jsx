/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

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
} from "@/faang/context";
import { BasePortal } from "@/faang/dialog";
import { FocusRegion, focusScopeQueries } from "@/faang/focus-region";
import {
  mergeRefs,
  useLayoutAnimationEvents,
  useResizeObserver,
} from "@/faang/hooks";
import { BaseContextualLayerAnchorRoot } from "@/faang/modal";
import {
  calculateBaseContextualLayerPosition,
  isElementFixedOrSticky,
} from "@/faang/utils";

import { BaseContextualLayerDefaultContainer } from "./base-contextual-layer-default-container";

// type BaseContextualLayerProps = {
//   align?
//   disableAutoAlign?
//   children?
//   containFocus?
//   customContainer?
//   disableAutoFlip?
//   hidden?
//   imperativeRef?
//   onEscapeFocusRegion?
//   onIndeterminatePosition?
//   presencePayload?
//   position?
//   stopClickPropagation?
//   className?: string
//   //
//   context_DEPRECATED?
//   contextRef?
// }

const styles = stylex.create({
  root: {
    left: "0",
    marginRight: "-9999px",
    position: "absolute",
    top: "0",
  },
});

const w = Locale.isRTL();

const u = 8;

export const BaseContextualLayer = forwardRef(
  (
    {
      align = "start",
      disableAutoAlign = false,
      children,
      containFocus = false,
      customContainer: CustomContainer = BaseContextualLayerDefaultContainer,
      disableAutoFlip = false,
      hidden = false,
      imperativeRef,
      onEscapeFocusRegion,
      onIndeterminatePosition,
      presencePayload,
      position = "below",
      stopClickPropagation = false,
      xstyle,
      from,
      ...rest
    },
    ref
  ) => {
    console.log({ des: "BaseContextualLayer", from, children });

    const [
      {
        adjustment: baseContextualLayerLayerAdjustmentValue,
        availableHeight: baseContextualLayerAvailableHeightValue,
        contextSize: baseContextualLayerContextSizeValue,
        isPositionIndeterminate: H,
        position: I,
      },
      J,
    ] = useReducer(ca, position, ba);

    const baseContextualLayerAnchorRootValue = useContext(
      BaseContextualLayerAnchorRootContext
    );

    const L = useContext(BaseScrollableAreaContext);
    const M = useContext(BaseViewportMarginsContext);
    const N = useContext(LayoutAnimationBoundaryContext);

    const [a, O] = useState(!1);

    const { hidden: G } = useContext(HiddenSubtreeContext);

    const P = G || hidden;

    const Q = useRef(null);
    const R = useRef(null);

    const S = useCallback(() => {
      return !rest.context_DEPRECATED && rest.contextRef
        ? rest.contextRef.current
        : rest.context_DEPRECATED;
    }, [rest.contextRef, rest.context_DEPRECATED]);

    const T = useCallback(() => {
      const a = document.documentElement;
      if (!a) {
        return;
      }
      return {
        bottom: a.clientHeight - M.bottom - u,
        left: M.left + u,
        right: a.clientWidth - M.right - u,
        top: M.top + u,
      };
    }, [M.bottom, M.left, M.right, M.top]);

    // eslint-disable-next-line complexity
    const U = useCallback(() => {
      let a = Q.current;
      let b = S();
      let c = T();
      if (!a || !b || !c) return;
      b = r(b);
      a = r(a);
      const d = a.bottom - a.top;
      a = a.right - a.left;
      let e = w ? "start" : "end";
      let f = w ? "end" : "start";
      let g = I;
      let h = null;
      disableAutoFlip ||
        (I === "above" || I === "below"
          ? I === "above" && b.top - d < c.top && b.bottom + d < c.bottom
            ? (g = "below")
            : I === "above" && s(L) + b.top < d
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
    }, [S, T, disableAutoFlip, I]);

    const V = useCallback(() => {
      let a = document.documentElement;
      let b = baseContextualLayerAnchorRootValue.current;
      let d = T();
      let e = S();
      if (!a || !b || !d || !e) {
        return;
      }
      const h = t(b);
      if (!h) {
        return;
      }
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
          return a ? v(a, r(b)) : null;
        }, r(e));
      if (!e || (e.left === 0 && e.right === 0)) {
        J({
          type: "position_indeterminate",
        });
        onIndeterminatePosition && onIndeterminatePosition();
        return;
      }
      a = b
        ? {
            bottom: a.clientHeight,
            left: 0,
            right: a.clientWidth,
            top: 0,
          }
        : r(h);
      b = calculateBaseContextualLayerPosition({
        align,
        contextRect: e,
        contextualLayerSize: disableAutoAlign ? null : R.current,
        fixed: b,
        offsetRect: a,
        position: I,
        screenRect: d,
      });
      a = b.adjustment;
      d = b.style;
      b = Q.current;
      if (b) {
        const i = Object.keys(d);
        for (let j = 0; j < i.length; j++) {
          const k = i[j];
          const l = d[k];
          l ? b.style.setProperty(k, l) : b.style.removeProperty(k);
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
    }, [
      baseContextualLayerAnchorRootValue,
      T,
      S,
      L,
      disableAutoAlign,
      align,
      I,
      onIndeterminatePosition,
    ]);

    const W = useCallback(
      (a) => {
        a === LayoutAnimationEvent.LayoutAnimationEventType.Start && O(!0);
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
      imperativeRef,
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

    const X = useResizeObserver((a) => {
      const b = a.height;
      a = a.width;
      R.current = {
        height: b,
        width: a,
      };
      V();
    });

    const Y = useRef(position);

    useLayoutEffect(() => {
      position !== Y.current &&
        (J({
          position,
          type: "position_changed",
        }),
        P || (U(), V()),
        (Y.current = position));
    });

    const Z = useCallback(
      (a) => {
        Q.current = a;
        a && !P && (U(), V());
      },
      [P, V, U]
    );

    useEffect(() => {
      if (P) return;
      const a = function () {
        U();
        V();
      };
      window.addEventListener("resize", a);
      return function () {
        window.removeEventListener("resize", a);
      };
    }, [P, V, U]);

    useEffect(() => {
      if (P) return;
      const a = L.map((a) => {
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
          // @ts-ignore
          passive: !0,
        });
      };
    }, [P, V]);

    const _ref = useMemo(() => {
      return mergeRefs(Z, X, ref);
    }, [Z, X, ref]);

    const baseContextualLayerOrientationValue = useMemo(() => {
      return {
        align: align,
        position: I,
      };
    }, [align, I]);

    const $ = hidden || H;

    // return (
    //   <BasePortal target={baseContextualLayerAnchorRootValue.current}>
    //     <CustomContainer
    //       hidden={hidden || H || a}
    //       presencePayload={presencePayload}
    //       ref={_ref}
    //       stopClickPropagation={stopClickPropagation}
    //       testid={undefined}
    //       xstyle={[styles.root, xstyle]}
    //     >
    //       <FocusRegion.FocusRegion
    //         autoFocusQuery={
    //           !$ && containFocus
    //             ? focusScopeQueries.headerFirstTabbableSecondScopeQuery
    //             : null
    //         }
    //         autoRestoreFocus={!$}
    //         containFocusQuery={
    //           !$ && containFocus ? focusScopeQueries.tabbableScopeQuery : null
    //         }
    //         onEscapeFocusRegion={onEscapeFocusRegion}
    //         recoverFocusQuery={
    //           $ ? null : focusScopeQueries.headerFirstTabbableSecondScopeQuery
    //         }
    //       >
    //         <BaseContextualLayerAnchorRoot>
    //           <BaseContextualLayerContextSizeContext.Provider
    //             value={baseContextualLayerContextSizeValue}
    //           >
    //             <BaseContextualLayerLayerAdjustmentContext.Provider
    //               value={baseContextualLayerLayerAdjustmentValue}
    //             >
    //               <BaseContextualLayerAvailableHeightContext.Provider
    //                 value={baseContextualLayerAvailableHeightValue}
    //               >
    //                 <BaseContextualLayerOrientationContext.Provider
    //                   value={baseContextualLayerOrientationValue}
    //                 >
    //                   <BaseLinkNestedPressableContext.Provider value={false}>
    //                     <CometTextContext.Provider value={null}>
    //                       {children}
    //                     </CometTextContext.Provider>
    //                   </BaseLinkNestedPressableContext.Provider>
    //                 </BaseContextualLayerOrientationContext.Provider>
    //               </BaseContextualLayerAvailableHeightContext.Provider>
    //             </BaseContextualLayerLayerAdjustmentContext.Provider>
    //           </BaseContextualLayerContextSizeContext.Provider>
    //         </BaseContextualLayerAnchorRoot>
    //       </FocusRegion.FocusRegion>
    //     </CustomContainer>
    //   </BasePortal>
    // );

    return jsx(BasePortal, {
      children: jsx(CustomContainer, {
        children: jsx(FocusRegion.FocusRegion, {
          autoFocusQuery:
            !$ && containFocus
              ? focusScopeQueries.headerFirstTabbableSecondScopeQuery
              : null,
          autoRestoreFocus: !$,
          children: jsx(BaseContextualLayerAnchorRoot, {
            children: jsx(BaseContextualLayerContextSizeContext.Provider, {
              children: jsx(
                BaseContextualLayerLayerAdjustmentContext.Provider,
                {
                  children: jsx(
                    BaseContextualLayerAvailableHeightContext.Provider,
                    {
                      children: jsx(
                        BaseContextualLayerOrientationContext.Provider,
                        {
                          children: jsx(
                            BaseLinkNestedPressableContext.Provider,
                            {
                              children: jsx(CometTextContext.Provider, {
                                children,
                                value: null,
                              }),
                              value: false,
                            }
                          ),
                          value: baseContextualLayerOrientationValue,
                        }
                      ),
                      value: baseContextualLayerAvailableHeightValue,
                    }
                  ),
                  value: baseContextualLayerLayerAdjustmentValue,
                }
              ),
              value: baseContextualLayerContextSizeValue,
            }),
          }),
          containFocusQuery:
            !$ && containFocus ? focusScopeQueries.tabbableScopeQuery : null,
          onEscapeFocusRegion: onEscapeFocusRegion,
          recoverFocusQuery: $
            ? null
            : focusScopeQueries.headerFirstTabbableSecondScopeQuery,
        }),
        hidden: hidden || H || a,
        presencePayload: presencePayload,
        ref: _ref,
        stopClickPropagation,
        testid: void 0,
        xstyle: [styles.root, xstyle],
      }),
      target: baseContextualLayerAnchorRootValue.current,
    });

    // return (
    //   <BasePortal
    //     target={baseContextualLayerAnchorRootValue.current}
    //     children={jsx(customContainer, {
    //       children: jsx(FocusRegion.FocusRegion, {
    //         autoFocusQuery:
    //           !$ && containFocus
    //             ? focusScopeQueries.headerFirstTabbableSecondScopeQuery
    //             : null,
    //         autoRestoreFocus: !$,
    //         children: jsx(BaseContextualLayerAnchorRoot, {
    //           children: jsx(BaseContextualLayerContextSizeContext.Provider, {
    //             children: jsx(
    //               BaseContextualLayerLayerAdjustmentContext.Provider,
    //               {
    //                 children: jsx(
    //                   BaseContextualLayerAvailableHeightContext.Provider,
    //                   {
    //                     children: jsx(
    //                       BaseContextualLayerOrientationContext.Provider,
    //                       {
    //                         children: jsx(
    //                           BaseLinkNestedPressableContext.Provider,
    //                           {
    //                             children: jsx(CometTextContext.Provider, {
    //                               children,
    //                               value: null,
    //                             }),
    //                             value: false,
    //                           }
    //                         ),
    //                         value: baseContextualLayerOrientationValue,
    //                       }
    //                     ),
    //                     value: baseContextualLayerAvailableHeightValue,
    //                   }
    //                 ),
    //                 value: baseContextualLayerLayerAdjustmentValue,
    //               }
    //             ),
    //             value: baseContextualLayerContextSizeValue,
    //           }),
    //         }),
    //         containFocusQuery:
    //           !$ && containFocus ? focusScopeQueries.tabbableScopeQuery : null,
    //         onEscapeFocusRegion: onEscapeFocusRegion,
    //         recoverFocusQuery: $
    //           ? null
    //           : focusScopeQueries.headerFirstTabbableSecondScopeQuery,
    //       }),
    //       hidden: hidden || H || a,
    //       presencePayload: presencePayload,
    //       ref: _ref,
    //       stopClickPropagation,
    //       testid: void 0,
    //       xstyle: [styles.root, xstyle],
    //     })}
    //   />
    // );
  }
);

function ca(state, option) {
  let c;
  switch (option.type) {
    case "determine_direction":
      if (
        state.position !== option.position ||
        state.availableHeight !== option.availableHeight
      )
        return {
          ...state,
          availableHeight: option.availableHeight,
          position: option.position,
        };
      break;
    case "reposition":
      if (
        state.adjustment !== option.adjustment ||
        (!(c = state.contextSize) ? void 0 : c.height) !==
          (!(c = option.contextSize) ? void 0 : c.height) ||
        (!(c = state.contextSize) ? void 0 : c.width) !==
          (!(c = option.contextSize) ? void 0 : c.width)
      )
        return {
          ...state,
          adjustment: option.adjustment,
          contextSize: option.contextSize,
          isPositionIndeterminate: !1,
        };
      break;
    case "position_indeterminate":
      return { ...state, isPositionIndeterminate: !0 };
    case "position_changed":
      if (state.position !== option.position)
        return { ...state, position: option.position };
      break;
  }
  return state;
}

function ba(position) {
  return {
    adjustment: null,
    availableHeight: null,
    contextSize: null,
    isPositionIndeterminate: !1,
    position,
  };
}

function r(a) {
  a = a.getBoundingClientRect();
  return {
    bottom: a.bottom,
    left: a.left,
    right: a.right,
    top: a.top,
  };
}

// function s(a) {
//   // eslint-disable-next-line no-return-assign, no-cond-assign
//   return (a = !(a = a[a.length - 1]) ? void 0 : !(a = a.getDOMNode()) ? void 0 : a.scrollTop) ? a : window.pageYOffset;
// }

// getScrollTop
function s(element) {
  // Disable eslint warnings for assignment in conditions
  // eslint-disable-next-line no-return-assign, no-cond-assign

  // Get the last element in the array
  const lastElement = element[element.length - 1];

  // Check if the last element exists and has a getDOMNode method
  const node = !lastElement
    ? undefined
    : !lastElement.getDOMNode()
    ? undefined
    : lastElement.getDOMNode();

  // Get the scrollTop value of the element or use window.pageYOffset as a fallback
  const scrollTop = node ? node.scrollTop : window.pageYOffset;

  return scrollTop;
}

function t(a) {
  const b = getComputedStyle(a);
  return b && b.getPropertyValue("position") !== "static"
    ? a
    : (a instanceof HTMLElement && a.offsetParent) ||
        a.ownerDocument.documentElement;
}

function v(a, b) {
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
