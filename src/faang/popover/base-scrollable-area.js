/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-sequences */

import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";
import UserAgent from "fbjs/lib/UserAgent";

import { BaseScrollableAreaContext } from "@/faang/context";
import { useUnsafeRef_DEPRECATED, useVisibilityObserver } from "@/faang/hooks";
import { CometDebounce } from "@/faang/utils";

const oStyles = stylex.create({
  baseScroller: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
  },
  baseScrollerHorizontal: {
    flexDirection: "row",
  },
  baseScrollerWithBottomShadow: {
    marginBottom: "-66px",
  },
  baseScrollerWithTopShadow: {
    marginTop: "-50px",
  },
  default: {
    WebkitOverflowScrolling: "touch",
    //
    // eslint-disable-next-line @stylexjs/valid-styles
    MsOverflowStyle: "x2atdfe",
    // eslint-disable-next-line @stylexjs/valid-styles
    MsScrollChaining: "xb57i2i",
    // eslint-disable-next-line @stylexjs/valid-styles
    MsScrollRails: "x1q594ok",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "relative",
    zIndex: 0,
  },
  expanding: {
    flexBasis: "100%",
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  expandingIE11: {
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  hideScrollbar: {
    // eslint-disable-next-line @stylexjs/valid-styles
    MsOverflowStyle: "x1pq812k",
    // eslint-disable-next-line @stylexjs/valid-styles
    scrollbarWidth: "none",
    // eslint-disable-next-line @stylexjs/valid-styles
    "::-webkit-scrollbar": {
      display: "none",
      height: 0,
      width: 0,
    },
  },
  horizontalAuto: {
    overflowX: "auto",
    overscrollBehaviorX: "contain",
  },
  perspective: {
    perspective: "1px",
    perspectiveOrigin: "right top",
    position: "relative",
    transformStyle: "preserve-3d",
  },
  perspectiveRTL: {
    perspectiveOrigin: "left top",
  },
  verticalAuto: {
    overflowY: "auto",
    overscrollBehaviorY: "contain",
  },
});

const pStyles = stylex.create({
  base: {
    boxSizing: "border-box",
    display: "none",
    right: 0,
    opacity: 0,
    paddingTop: 0,
    paddingRight: "4px",
    paddingBottom: 0,
    paddingLeft: "4px",
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    transformOrigin: "right top",
    transitionDuration: ".3s",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
    width: "16px",
  },
  hovered: {
    opacity: 1,
    transitionDuration: "0",
  },
  inner: {
    backgroundColor: "var(--scroll-thumb)",
    borderRadius: "4px",
    height: "100%",
    width: "100%",
  },
  rtl: {
    transformOrigin: "left top",
  },
});

const tStyles = stylex.create({
  bottom: {
    bottom: "0",
  },
  main: {
    height: "1px",
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    width: "1px",
  },
  top: {
    top: 0,
  },
});

const dummyStyles = stylex.create({
  dummy1: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    height: "50px",
    right: 0,
    left: 0,
    pointerEvents: "none",
    position: "sticky",
    zIndex: 1,
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: "inset(16px 0 0 0)",
    clipPath: "inset(16px 0 0 0)",
    justifyContent: "flex-start",
    top: "-34px",
  },

  dummy2: {
    flexShrink: 0,
    height: "16px",
    position: "sticky",
    top: "0px",

    // eslint-disable-next-line @stylexjs/valid-styles
    ":after": {
      height: "16px",
      boxShadow: "var(--scroll-shadow)",
      content: '""',
      position: "absolute",
      top: "-16px",
      width: "100%",
    },
  },

  dummy3: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    height: "50px",
    right: 0,
    left: 0,
    pointerEvents: "none",
    position: "sticky",
    zIndex: 1,
    bottom: "-34px",
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: "inset(0 0 16px 0)",
    clipPath: "inset(0 0 16px 0)",
    justifyContent: "flex-end",
    marginBottom: "16px",
  },

  dummy4: {
    flexShrink: 0,
    height: "16px",
    // position: '-webkit-sticky',
    position: "sticky",

    "::after": {
      boxShadow: "var(--scroll-shadow)",
      content: "''",
      height: "16px",
      position: "absolute",
      top: "-16px",
      width: "100%",
      bottom: 0,
      transform: "scaleY(-1)",
    },
  },

  dummy5: {
    backgroundColor: "var(--divider)",
    display: "none",
    height: "100%",
    right: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    transitionDuration: ".5s",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
    width: "16px",

    // eslint-disable-next-line @stylexjs/valid-styles
    ":hover": {
      opacity: 0.3,
    },
  },

  dummy6: {
    backgroundColor: "var(--scroll-thumb)",
    borderRadius: "4px",
    height: "100%",
    width: "100%",
  },
});

// d("Locale").isRTL()
const q = Locale.isRTL();
const r = false;

export const BaseScrollableArea = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      children,
      contentRef,
      expanding = false,
      forceBrowserDefault = false,
      hideScrollbar = false,
      horizontal,
      id,
      onScroll,
      onScrollBottom,
      onScrollTop,
      scrollTracePolicy,
      style,
      tabIndex,
      testid,
      vertical,
      withBottomShadow = false,
      withTopShadow = false,
      xstyle,
      ...rest
    },
    ref
  ) => {
    // const o = useOStyles();
    // const p = usePStyles();

    // const dummyClasses = useDummyStyles();

    const J = useMemo(() => {
      return (
        forceBrowserDefault || !vertical || hideScrollbar || horizontal || x()
      );
    }, [forceBrowserDefault, vertical, hideScrollbar, horizontal]);

    const [mouseEnter, setMouseEnter] = useState(false);
    const [N, O] = useState(false);
    const [aa, P] = useState(false);

    const Q = useContext(BaseScrollableAreaContext);

    const R = useRef(null);
    const S = useUnsafeRef_DEPRECATED(null);
    const T = useRef(null);
    const U = useRef(null);
    const V = useRef(null);
    const W = useRef(0);

    useEffect(() => {
      let a;
      if (J) {
        return;
      }
      let b = S.current;
      let d = R.current;
      let f =
        (a = contentRef === null ? void 0 : contentRef.current) !== null
          ? a
          : d;
      let g = U.current;
      let h = T.current;
      if (d === null || f === null || b === null || h === null || g === null) {
        return;
      }
      let i = 0;
      let j = 0;
      a = function () {
        g.style.display = "none";
        h.style.display = "none";
        let a = b.getBoundingClientRect();
        let c = f.getBoundingClientRect();
        let e = b.scrollHeight;
        let k = d.scrollHeight;
        let l = f.scrollHeight;
        k = k - l;
        let m = k !== 0;
        k = Math.ceil(a.height - k);
        j = a.top;
        W.current = m ? l : e;
        l = W.current;
        i = Math.pow(k, 2) / l;
        h.style.height = l <= k ? "0px" : i + "px";
        g.style.height = l + "px";
        q
          ? ((h.style.left = "0px"), (g.style.left = "0px"))
          : ((h.style.right = "0px"), (g.style.right = "0px"));
        e = b.scrollTop;
        c = c.top - a.top + e;
        a = 0;
        m && ((a = c * -1), (g.style.top = c + "px"), (h.style.top = c + "px"));
        e = (k - i) / (l - k);
        h.style.transform = [
          "matrix3d(\n          1,0,0,0,\n          0,1,0,0,\n          0," +
            a +
            ",1,0,\n          0,0,0,-1)",
          "scale(" + 1 / e + ")",
          "translateZ(" + (1 - 1 / e) + "px)",
          "translateZ(-2px)",
        ].join(" ");
        h.style.display = "block";
        g.style.display = l <= k ? "none" : "block";
      };
      const k = function (a) {
        s(a);
        let c = a.clientY;
        a = b.clientHeight;
        let d = b.scrollTop;
        P(true);
        let e = W.current / a;
        a = d / e;
        if (c < j + a || c > j + a + i) {
          let f = c < j + a ? -20 : 20;
          let h = true;
          let k = window.setInterval(() => {
            h &&
              b.scrollTo({
                top: b.scrollTop + f,
              });
          }, 16);
          a = function a(b) {
            s(b),
              k && window.clearInterval(k),
              window.removeEventListener("mouseup", a, true),
              g.removeEventListener("mouseenter", l),
              g.removeEventListener("mouseleave", m);
          };
          let l = function (a) {
            s(a), (h = true);
          };
          let m = function (a) {
            s(a), (h = false);
          };
          window.addEventListener("mouseup", a, true);
          g.addEventListener("mouseenter", l);
          g.addEventListener("mouseleave", m);
          return;
        }
        let n = function (a) {
          s(a);
          a = a.clientY - c;
          b.scrollTo({
            top: d + a * e,
          });
        };
        a = function a(b) {
          s(b),
            P(false),
            window.removeEventListener("mousemove", n, true),
            window.removeEventListener("mouseup", a, true);
        };
        window.addEventListener("mousemove", n, true);
        window.addEventListener("mouseup", a, true);
      };
      const l = CometDebounce(a, {
        wait: 100,
      });
      window.addEventListener("resize", l);
      g.addEventListener("mousedown", k);
      const m = new ResizeObserver(l);
      m.observe(d);
      m.observe(b);
      return function () {
        window.removeEventListener("resize", l),
          g.removeEventListener("mousedown", k),
          m.disconnect(),
          l.reset();
      };
    }, [contentRef, S, J]);

    const onMouseEnter = function () {
      setMouseEnter(true);
    };

    const onMouseLeave = function () {
      return setMouseEnter(false);
    };

    const onScrollFunc = function (a) {
      onScroll && onScroll(a),
        O(true),
        V.current && window.clearTimeout(V.current),
        (V.current = window.setTimeout(() => {
          O(false);
        }, 1e3));
    };

    useEffect(() => {
      return function () {
        window.clearTimeout(V.current);
      };
    }, []);

    const Y = useMemo(() => {
      return {
        getDOMNode: function () {
          return S.current;
        },
      };
    }, []);

    useImperativeHandle(
      ref,
      // @ts-ignore
      () => {
        return Y;
      },
      [Y]
    );

    const b = useMemo(() => {
      // @ts-ignore
      return [].concat(Q, [Y]);
    }, [Y, Q]);

    const TopShadowComppnent = jsx("div", {
      className: stylex(dummyStyles.dummy1),
      // 'x78zum5 xdt5ytf x2lah0s x10wjd1d xds687c x17qophe x47corl x7wzq59 x1vjfegm x19bjbvb x1nhvcw1 xepu288',
      children: jsx("div", {
        className: stylex(dummyStyles.dummy2),
        // 'x2lah0s xlup9mm x7wzq59 x7r5tp8 x1s928wv x1a5uphr x1j6awrg x1s71c9q x4eaejv x13vifvy',
      }),
    });

    const BottomShadowComppnent = jsx("div", {
      className: stylex(dummyStyles.dummy3),
      // 'x78zum5 xdt5ytf x2lah0s x10wjd1d xds687c x17qophe x47corl x7wzq59 x1vjfegm x1l3hj4d x1vjtdzu x13a6bvl x1yztbdb',
      children: jsx("div", {
        className: stylex(dummyStyles.dummy4),
        // 'x2lah0s xlup9mm x7wzq59 x7r5tp8 x1s928wv x1a5uphr x1j6awrg x1s71c9q x4eaejv x1ey2m1c xtjevij',
      }),
    });

    return J
      ? jsx(BaseScrollableAreaContext.Provider, {
          value: b,
          children: jsxs("div", {
            ...rest,
            className: stylex(
              oStyles["default"],
              expanding && (r ? oStyles.expandingIE11 : oStyles.expanding),
              hideScrollbar && oStyles.hideScrollbar,
              horizontal && oStyles.horizontalAuto,
              vertical && oStyles.verticalAuto,
              xstyle
            ),
            "data-testid": void 0,
            id: id,
            onScroll: onScrollFunc,
            ref: S,
            style,
            tabIndex,
            children: [
              withTopShadow && TopShadowComppnent,
              jsxs("div", {
                className: stylex(
                  oStyles.baseScroller,
                  horizontal && !vertical && oStyles.baseScrollerHorizontal,
                  withTopShadow && oStyles.baseScrollerWithTopShadow,
                  withBottomShadow && oStyles.baseScrollerWithBottomShadow
                ),
                children: [
                  onScrollTop
                    ? jsx(onScrollTopComp, {
                        onVisible: onScrollTop,
                        scrollerRef: S,
                      })
                    : null,
                  children,
                  onScrollBottom
                    ? jsx(v, {
                        onVisible: onScrollBottom,
                        scrollerRef: S,
                      })
                    : null,
                ],
              }),
              withBottomShadow && BottomShadowComppnent,
            ],
          }),
        })
      : jsx(BaseScrollableAreaContext.Provider, {
          value: b,
          children: jsxs("div", {
            ...rest,
            className: stylex(
              oStyles.default,
              oStyles.hideScrollbar,
              expanding && (r ? oStyles.expandingIE11 : oStyles.expanding),
              oStyles.perspective,
              q && oStyles.perspectiveRTL,
              horizontal && oStyles.horizontalAuto,
              vertical && oStyles.verticalAuto,
              xstyle
            ),
            "data-scrolltracepolicy": scrollTracePolicy,
            "data-testid": void 0,
            id,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            onScroll: onScrollFunc,
            ref: S,
            style,
            tabIndex,
            children: [
              withTopShadow && TopShadowComppnent,
              jsxs("div", {
                className: stylex(
                  oStyles.baseScroller,
                  horizontal && !vertical && oStyles.baseScrollerHorizontal,
                  withTopShadow && oStyles.baseScrollerWithTopShadow,
                  withBottomShadow && oStyles.baseScrollerWithBottomShadow
                ),
                ref: R,
                children: [
                  onScrollTop
                    ? jsx(onScrollTopComp, {
                        onVisible: onScrollTop,
                        scrollerRef: S,
                      })
                    : null,
                  children,
                  onScrollBottom
                    ? jsx(v, {
                        onVisible: onScrollBottom,
                        scrollerRef: S,
                      })
                    : null,
                ],
              }),
              withBottomShadow && BottomShadowComppnent,
              jsx("div", {
                className: stylex(dummyStyles.dummy5),
                // 'x14nfmen x1s85apg x5yr21d xds687c xg01cxk x10l6tqk x13vifvy x1wsgiic x19991ni xwji4o3 x1kky2od x1sd63oq',

                // c('CometVisualCompletionAttributes').IGNORE,
                "data-thumb": 1,
                ref: U,
              }),
              jsx("div", {
                className: stylex(
                  pStyles.base,
                  q && pStyles.rtl,
                  (mouseEnter || N || aa) && pStyles.hovered
                ),
                // c('CometVisualCompletionAttributes').IGNORE,
                "data-thumb": 1,
                ref: T,
                children: jsx("div", {
                  className: stylex(pStyles.dummy6),
                  // 'x1hwfnsy x1lcm9me x1yr5g0i xrt01vj x10y3i5r x5yr21d xh8yej3',
                }),
              }),
            ],
          }),
        });
  }
);

function x() {
  return (
    UserAgent.isPlatform("iOS") ||
    UserAgent.isPlatform("Android") ||
    UserAgent.isBrowser("Edge") ||
    UserAgent.isBrowser("IE") ||
    UserAgent.isBrowser("Firefox < 64")
  );
}

const s = function (a) {
  a.preventDefault();
  a.stopPropagation();
  a.stopImmediatePropagation();
};

function u(a) {
  let b = a.onVisible;
  let d = a.scrollerRef;
  a = a.xstyle;
  let e = useMemo(() => {
    return function () {
      return d.current;
    };
  }, [d]);
  b = useVisibilityObserver({
    onVisible: b,
    options: {
      root: e,
      rootMargin: 0,
    },
  });
  return jsx("div", {
    className: stylex(tStyles.main, a),
    ref: b,
  });
}

function onScrollTopComp(a) {
  let b = a.onVisible;
  a = a.scrollerRef;
  return jsx(u, {
    onVisible: b,
    scrollerRef: a,
    className: tStyles.top,
  });
}

function v(a) {
  let b = a.onVisible;
  a = a.scrollerRef;
  return jsx(u, {
    onVisible: b,
    scrollerRef: a,
    xstyle: tStyles.bottom,
  });
}
