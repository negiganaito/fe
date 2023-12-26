/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";
import emptyFunction from "fbjs/lib/emptyFunction";

import { BaseMultiPageViewContext } from "@/faang/context";
import {
  FocusInertRegion,
  FocusRegionStrictMode,
  focusScopeQueries,
} from "@/faang/focus-region";
import { mergeRefs_Legacy } from "@/faang/hooks";
import { testID } from "@/faang/utils";

import { HiddenSubtreeContextProvider } from "./hidden-subtree-context-provider";

const styles = stylex.create({
  page: {
    // eslint-disable-next-line @stylexjs/valid-styles
    border: "inherit",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    transformOrigin: "top left",
  },
  pageInactive: {
    display: "none",
    left: 0,
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  root: {
    alignItems: "stretch",
    clipPath: "inset(0 0 0 0)",
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: "inset(0 0 0 0)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transformOrigin: "top left",
  },
});

const q = false;

const p = 300;

const o = false;

function r(a) {
  return Math.cos((a + 1) * Math.PI) / 2 + 0.5;
}

export const BaseMultiPageViewContainer = forwardRef(
  (
    {
      children,
      disableAutoFocus = false,
      disableAutoRestoreFocus = false,
      disableFocusContainment = false,
      disableInitialAutoFocus = false,
      fallback,
      imperativeRef,
      onPageChange = emptyFunction,
      onAddPage,
      onPopPage,
      onClearRemovedPages,
      pageXStyle,
      pageHistory,
      placeholderComponent,
      xstyle,
    },
    ref
  ) => {
    const E = useRef(null);
    const F = useRef(null);
    const G = useRef(null);
    const H = useRef(!1);
    const I = disableInitialAutoFocus && !H.current;
    const J = useCallback(() => {
      const a = E.current;
      const b = F.current;
      b
        ? (G.current = b.getBoundingClientRect())
        : a && (G.current = a.getBoundingClientRect());
    }, []);

    const onAddPageCb = useCallback(
      (a, b, c) => {
        J();
        H.current = !0;
        onAddPage(a, b, c);
      },
      [onAddPage, J]
    );

    const popPageCb = useCallback(
      (a) => {
        J();
        onPopPage(a);
      },
      [onPopPage, J]
    );

    const onPushPageCb = useCallback(
      (a, b) => {
        return onAddPageCb("end", a, b);
      },
      [onAddPageCb]
    );

    const N = useMemo(() => {
      for (let a = pageHistory.length - 1; a >= 0; a--) {
        const b = pageHistory[a];
        if (b.type !== "pushed_page" || !b.removed) return a;
      }
      return 0;
    }, [pageHistory]);

    const O = useRef(N);

    useEffect(() => {
      // eslint-disable-next-line no-sequences
      N !== O.current && onPageChange && onPageChange(N), (O.current = N);
    }, [onPageChange, N]);

    const P = useCallback(
      (a) => {
        const b = F.current;
        const c = E.current;
        if (a) {
          let d = pageHistory[N];
          d = d.type === "pushed_page" ? d.direction : "end";
          O.current > N && (d = d === "start" ? "end" : "start");
          const e = G.current;
          const f = a.getBoundingClientRect();
          if (!q && b && b !== a && e && c) {
            d = (d === "start" ? -1 : 1) * (o ? -1 : 1);
            b.style.cssText = "";
            a.style.cssText = "";
            b.style.setProperty("display", "flex");
            b.style.setProperty("width", e.width + "px");
            b.style.setProperty("height", e.height + "px");
            a.style.removeProperty("display");
            a.style.removeProperty("width");
            a.style.removeProperty("height");
            const g = Math.round(60 * (p / 1e3));
            const h = [];
            const i = [];
            const j = [];
            for (let k = 0; k <= g; k++) {
              let l = k / g;
              let m = r(l);
              let n = e.width / f.width;
              let s = e.height / f.height;
              n = n + (1 - n) * m;
              s = s + (1 - s) * m;
              let t = e.left - f.left;
              let u = e.top - f.top;
              t = t * (1 - m);
              let v = u * (1 - m);
              let w = Math.min(e.width, f.width);
              let x = w * -d * m;
              w = w * d * (1 - m);
              m = u - v;
              u = -v;
              h.push({
                easing: "step-end",
                offset: l,
                transform:
                  "translateX(" +
                  t +
                  "px) translateY(" +
                  v +
                  "px) scaleX(" +
                  n +
                  ") scaleY(" +
                  s +
                  ")",
              });
              i.push({
                easing: "step-end",
                offset: l,
                transform:
                  "scaleX(" +
                  1 / n +
                  ") scaleY(" +
                  1 / s +
                  ") translateX(" +
                  x +
                  "px) translateY(" +
                  m +
                  "px)",
              });
              j.push({
                easing: "step-end",
                offset: l,
                transform:
                  "scaleX(" +
                  1 / n +
                  ") scaleY(" +
                  1 / s +
                  ") translateX(" +
                  w +
                  "px) translateY(" +
                  u +
                  "px)",
              });
            }
            a.animate(j, p);
            c.animate(h, p);
            b.animate(i, p);
            a.animate(
              [
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                },
              ],
              p
            );
            b.animate(
              [
                {
                  opacity: 1,
                },
                {
                  opacity: 0,
                },
              ],
              p
            ).onfinish = function () {
              b.style.cssText = "";
              onClearRemovedPages && onClearRemovedPages();
            };
          }
          F.current = a;
        }
      },
      [N, onClearRemovedPages, pageHistory]
    );

    useImperativeHandle(
      imperativeRef,
      () => {
        return {
          addPage: onAddPageCb,
          popPage: popPageCb,
        };
      },
      [popPageCb, onAddPageCb]
    );

    const Q = useMemo(() => {
      return {
        fallback,
        placeholderComponent,
        popPage: popPageCb,
        pushPage: onPushPageCb,
      };
    }, [fallback, placeholderComponent, popPageCb, onPushPageCb]);

    const a = useMemo(() => {
      return mergeRefs_Legacy(E, ref);
    }, [ref]);

    return jsx("div", {
      className: stylex(styles.root, xstyle),
      ref: a,
      // c('testID')('BaseMultiStepContainer'),
      children: pageHistory.map((a, b) => {
        return jsx(
          "div",
          {
            "aria-hidden": b !== N,
            className: stylex(
              styles.page,
              b !== N && styles.pageInactive,
              pageXStyle
            ),
            ref: b === N ? P : null,
            ...testID(b === 0 ? "base-multistep-container-first-step" : null),
            children: jsx(FocusRegionStrictMode.FocusRegion, {
              // FocusRegionStrictMode
              autoFocusQuery:
                !disableAutoFocus && !I && b === N
                  ? focusScopeQueries.headerOrTabbableScopeQuery
                  : null,
              autoRestoreFocus: !disableAutoRestoreFocus,
              containFocusQuery: disableFocusContainment
                ? null
                : focusScopeQueries.tabbableScopeQuery,
              recoverFocusQuery: focusScopeQueries.headerOrTabbableScopeQuery,
              children: jsx(FocusInertRegion, {
                disabled: b === N,
                children: jsx(HiddenSubtreeContextProvider, {
                  isHidden: b !== N,
                  children: jsx(BaseMultiPageViewContext.Provider, {
                    value: Q,
                    children:
                      a.type === "initial_page"
                        ? typeof children === "function"
                          ? children(onPushPageCb)
                          : children
                        : a.type === "pushed_page"
                        ? React.createElement(a.component, {
                            onReturn: popPageCb,
                          })
                        : null,
                  }),
                }),
              }),
            }),
          },
          a.key
        );
      }),
    });
  }
);
