/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-sequences */

import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";
import ResizeObserver from "resize-observer-polyfill";

import { BaseScrollableAreaContext } from "@/faang/context";
import { useUnsafeRef_DEPRECATED, useVisibilityObserver } from "@/faang/hooks";
import UserAgent from "@/faang/user-agent";
import { CometDebounce } from "@/faang/utils";

const containerStyles = stylex.create({
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
    // MsOverflowStyle: "x2atdfe",
    // eslint-disable-next-line @stylexjs/valid-styles
    // MsScrollChaining: "xb57i2i",
    // eslint-disable-next-line @stylexjs/valid-styles
    // MsScrollRails: "x1q594ok",
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

const scrollThumbStyles = stylex.create({
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

const positionStyles = stylex.create({
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
const isRTL = Locale.isRTL();
const isIE11 = false;

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

    const shouldUseDefaultScrolling = useMemo(() => {
      return (
        forceBrowserDefault ||
        !vertical ||
        hideScrollbar ||
        horizontal ||
        shouldUseCustomScrolling()
      );
    }, [forceBrowserDefault, vertical, hideScrollbar, horizontal]);

    const [mouseEnter, setMouseEnter] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasScrollTimeout, setHasScrollTimeout] = useState(false);

    const scrollableAreaContext = useContext(BaseScrollableAreaContext);

    const R = useRef(null);
    const scrollerRef = useUnsafeRef_DEPRECATED(null);
    const topShadowRef = useRef(null);
    const bottomShadowRef = useRef(null);
    const thumbRef = useRef(null);
    const thumbPositionRef = useRef(0);

    useEffect(() => {
      let a;
      if (shouldUseDefaultScrolling) {
        return;
      }
      let b = scrollerRef.current;
      let d = R.current;
      // eslint-disable-next-line no-cond-assign
      let f = (a = !contentRef ? undefined : contentRef.current) ? a : d;
      let g = bottomShadowRef.current;
      let h = topShadowRef.current;
      if (!d || !f || !b || !h || !g) {
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
        thumbPositionRef.current = m ? l : e;
        l = thumbPositionRef.current;
        i = Math.pow(k, 2) / l;
        h.style.height = l <= k ? "0px" : i + "px";
        g.style.height = l + "px";
        isRTL
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
        preventDefaultAndStopPropagation(a);
        let c = a.clientY;
        a = b.clientHeight;
        let d = b.scrollTop;
        setHasScrollTimeout(true);
        let e = thumbPositionRef.current / a;
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
            preventDefaultAndStopPropagation(b),
              k && window.clearInterval(k),
              window.removeEventListener("mouseup", a, true),
              g.removeEventListener("mouseenter", l),
              g.removeEventListener("mouseleave", m);
          };
          let l = function (a) {
            preventDefaultAndStopPropagation(a), (h = true);
          };
          let m = function (a) {
            preventDefaultAndStopPropagation(a), (h = false);
          };
          window.addEventListener("mouseup", a, true);
          g.addEventListener("mouseenter", l);
          g.addEventListener("mouseleave", m);
          return;
        }
        let n = function (a) {
          preventDefaultAndStopPropagation(a);
          a = a.clientY - c;
          b.scrollTo({
            top: d + a * e,
          });
        };
        a = function a(b) {
          preventDefaultAndStopPropagation(b),
            setHasScrollTimeout(false),
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
    }, [contentRef, scrollerRef, shouldUseDefaultScrolling]);

    const onMouseEnter = function () {
      setMouseEnter(true);
    };

    const onMouseLeave = function () {
      return setMouseEnter(false);
    };

    const onScrollHandler = function (a) {
      onScroll && onScroll(a),
        setIsScrolling(true),
        thumbRef.current && window.clearTimeout(thumbRef.current),
        (thumbRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 1e3));
    };

    useEffect(() => {
      return function () {
        window.clearTimeout(thumbRef.current);
      };
    }, []);

    const positionMarkerProps = useMemo(() => {
      return {
        getDOMNode: function () {
          return scrollerRef.current;
        },
      };
    }, []);

    useImperativeHandle(
      ref,
      // @ts-ignore
      () => {
        return positionMarkerProps;
      },
      [positionMarkerProps]
    );

    const contextProviders = useMemo(() => {
      // @ts-ignore
      return [].concat(scrollableAreaContext, [positionMarkerProps]);
    }, [positionMarkerProps, scrollableAreaContext]);

    const TopShadowComp = (
      <div className={stylex(dummyStyles.dummy1)}>
        <div className={stylex(dummyStyles.dummy2)} />
      </div>
    );

    const BottomShadowComp = (
      <div className={stylex(dummyStyles.dummy3)}>
        <div className={stylex(dummyStyles.dummy4)} />
      </div>
    );

    if (shouldUseDefaultScrolling) {
      return (
        <BaseScrollableAreaContext.Provider value={contextProviders}>
          <div
            {...rest}
            className={stylex(
              containerStyles.default,
              expanding &&
                (isIE11
                  ? containerStyles.expandingIE11
                  : containerStyles.expanding),
              hideScrollbar && containerStyles.hideScrollbar,
              horizontal && containerStyles.horizontalAuto,
              vertical && containerStyles.verticalAuto,
              xstyle
            )}
            data-testid={undefined}
            id={id}
            onScroll={onScrollHandler}
            ref={scrollerRef}
            style={style}
            tabIndex={tabIndex}
          >
            {withTopShadow && TopShadowComp}
            <div
              className={stylex(
                containerStyles.baseScroller,
                horizontal &&
                  !vertical &&
                  containerStyles.baseScrollerHorizontal,
                withTopShadow && containerStyles.baseScrollerWithTopShadow,
                withBottomShadow && containerStyles.baseScrollerWithBottomShadow
              )}
            >
              {onScrollTop && (
                <OnScrollTopComp
                  onVisible={onScrollTop}
                  scrollerRef={scrollerRef}
                />
              )}
              {children}
              {onScrollBottom && (
                <OnScrollBottomComp
                  onVisible={onScrollBottom}
                  scrollerRef={scrollerRef}
                />
              )}
            </div>
            {withBottomShadow && BottomShadowComp}
          </div>
        </BaseScrollableAreaContext.Provider>
      );
    } else {
      return (
        <BaseScrollableAreaContext.Provider value={contextProviders}>
          <div
            {...rest}
            className={stylex(
              containerStyles.default,
              containerStyles.hideScrollbar,
              expanding &&
                (isIE11
                  ? containerStyles.expandingIE11
                  : containerStyles.expanding),
              containerStyles.perspective,
              isRTL && containerStyles.perspectiveRTL,
              horizontal && containerStyles.horizontalAuto,
              vertical && containerStyles.verticalAuto,
              xstyle
            )}
            data-scrolltracepolicy={scrollTracePolicy}
            data-testid={undefined}
            id={id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onScroll={onScrollHandler}
            ref={scrollerRef}
            style={style}
            tabIndex={tabIndex}
          >
            {withTopShadow && TopShadowComp}
            <div
              className={stylex(
                containerStyles.baseScroller,
                horizontal &&
                  !vertical &&
                  containerStyles.baseScrollerHorizontal,
                withTopShadow && containerStyles.baseScrollerWithTopShadow,
                withBottomShadow && containerStyles.baseScrollerWithBottomShadow
              )}
              ref={R}
            >
              {onScrollTop && (
                <OnScrollTopComp
                  onVisible={onScrollTop}
                  scrollerRef={scrollerRef}
                />
              )}
              {children}
              {onScrollBottom && (
                <OnScrollBottomComp
                  onVisible={onScrollBottom}
                  scrollerRef={scrollerRef}
                />
              )}
            </div>
            {withBottomShadow && BottomShadowComp}
            <div
              className={stylex(dummyStyles.dummy5)}
              data-thumb={1}
              ref={bottomShadowRef}
            />
            <div
              className={stylex(
                scrollThumbStyles.base,
                isRTL && scrollThumbStyles.rtl,
                (mouseEnter || isScrolling || hasScrollTimeout) &&
                  scrollThumbStyles.hovered
              )}
              data-thumb={1}
              ref={topShadowRef}
            >
              <div className={stylex(scrollThumbStyles.dummy6)} />
            </div>
          </div>
        </BaseScrollableAreaContext.Provider>
      );
    }
  }
);

// TODO: bug
function shouldUseCustomScrolling() {
  return (
    UserAgent.isPlatform("iOS") ||
    UserAgent.isPlatform("Android") ||
    UserAgent.isBrowser("Edge") ||
    UserAgent.isBrowser("IE") ||
    UserAgent.isBrowser("Firefox < 64")
  );

  // return false;
}

const preventDefaultAndStopPropagation = function (a) {
  a.preventDefault();
  a.stopPropagation();
  a.stopImmediatePropagation();
};

function CreatePositionMarkerComp(a) {
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
  return <div className={stylex(positionStyles.main, a)} ref={b} />;
}

function OnScrollTopComp(a) {
  let b = a.onVisible;
  a = a.scrollerRef;
  return (
    <CreatePositionMarkerComp
      onVisible={b}
      scrollerRef={a}
      xstyle={positionStyles.top}
    />
  );
}

function OnScrollBottomComp(a) {
  let b = a.onVisible;
  a = a.scrollerRef;
  return (
    <CreatePositionMarkerComp
      onVisible={b}
      scrollerRef={a}
      xstyle={positionStyles.bottom}
    />
  );
}
