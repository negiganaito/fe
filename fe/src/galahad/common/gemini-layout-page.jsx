/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  forwardRef,
  memo,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";
import { thatReturnsArgument } from "fbjs/lib/emptyFunction";
import Locale from "fbjs/lib/Locale";

import { CometBase } from "@/faang/base-row";
import { CometPagelet } from "@/faang/comet-placeholder";
import { CometSSRMultipassBoundary } from "@/faang/common";
import { BaseViewportMarginsContext } from "@/faang/context";
import { CometErrorBoundary } from "@/faang/error";
import { VoyageUserJourneyUILayerProvider } from "@/faang/modal/voyage-user-journey-ui-layer-provider";
import { executionEnvironment, supportsCSSSticky } from "@/faang/utils";

import {
  GeminiLayoutFullWidthModeContext,
  GeminiLayoutHasFixedBannerContext,
  GeminiLayoutHeaderContext,
  GeminiLayoutHeaderHeightContext,
  GeminiNavAndChannelContext,
} from "../context";
import {
  useGeminiLayoutChannelMeasureListenerForNonSticky,
  useGeminiLayoutHorizontalScrolling,
  useGeminiLayoutIntersectionObserverForSticky,
  useGeminiLayoutIsFullWidth,
} from "../hooks";

// import { useGeminiLayoutHorizontalScrolling } from "../hooks/use-gemini-layout-horizontal-scrolling";
// import { useGeminiLayoutIsFullWidth } from "../hooks/use-gemini-layout-is-full-width";
import { GeminiLayoutNonResponsivenessWrappers } from "./gemini-layout-non-responsiveness-wrappers";

const s = 96;
const t = 56;
const v = 300;
const w = 870;

// eslint-disable-next-line no-unused-vars
const x = 300;

const y = 85;
const z = 35;

// eslint-disable-next-line no-unused-vars
const A = 16;

const styles = stylex.create({
  navigationSticky: {
    width: "100%",
    position: "sticky",
    top: 0,
  },
  navigationFixed: {
    position: "fixed",
    minWidth: "96px",
    top: "0",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      marginLeft: 0,
    },
  },
  navigationFixedWP4MAppBar: {
    minWidth: "56px",
  },
  navigationInner: {
    top: "0",
    height: "100vh",
    width: "100%",
    maxWidth: "inherit",
    flexDirection: "row",
    display: "flex",
    boxSizing: "border-box",
  },
  navigationInnerWithBannerNarrowBuffer: {
    paddingTop: "22px",
  },
  navigationAppNavList: {
    width: "96px",
    minWidth: "96px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  navigationAppNavListWP4MAppBar: {
    width: "56px",
    minWidth: "56px",
  },
  navigationBuffer: {
    width: "100%",
    height: "100%",
  },
  channelWrapper: {
    width: "100%",
    minWidth: "300px",
    maxWidth: "420px",
  },
  channelWrapperHidden: {
    display: "none",
  },
  channelWrapperAutoHideButVisible: {
    position: "absolute",
    left: "96px",
    width: "420px",
    borderRadius: 0,
    borderTopLeftRadius: "0",
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    borderBottomLeftRadius: "0",
    boxShadow:
      "1px 0 2px 0 var(--fds-black-alpha-05),2px 0 6px 2px var(--fds-black-alpha-05)",
  },
  channelWrapperAutoHideButVisibleWP4MAppBar: {
    left: "56px",
  },
  content: {
    display: "flex",
    minWidth: "0",
    flexBasis: "870px",
    flexDirection: "column",
    flexGrow: 4,
    flexShrink: 1,
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: "var(--divider)",
    boxSizing: "border-box",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media print": {
      borderRightStyle: "none",
    },
  },
  contentFullHeight: {
    alignSelf: "stretch",
    height: "auto",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentWithTopBannerNarrowBuffer: {
    paddingTop: "22px",
  },
  header: {
    zIndex: 2,
    backgroundColor: "var(--wig-page-background)",
  },
  headerSticky: {
    position: "sticky",
  },
  headerFixed: {
    top: "0",
    width: "100%",
    position: "fixed",
    zIndex: 2,
    backgroundColor: "var(--wig-page-background)",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: "var(--divider)",
    maxWidth: "calc(100% - 96px)",
    minWidth: "1266px",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      maxWidth: "1504px",
    },
  },
  headerFixedWP4MAppBar: {
    maxWidth: "calc(100% - 56px)",
    minWidth: "1226px",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      maxWidth: "1544px",
    },
  },
  headerFixedFluid: {
    maxWidth: "calc(100% - 96px)",
    minWidth: "1170px",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      maxWidth: "calc(100% - 96px)",
    },
  },
  headerFixedFluidWP4MAppBar: {
    maxWidth: "calc(100% - 56px)",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      maxWidth: "calc(100% - 56px)",
    },
  },
  coverPhoto: {
    height: "300px",
    width: "100%",
  },
  headerContents: {
    boxSizing: "border-box",
    paddingTop: "16px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
  },
  headerContentsConstrastBackground: {
    backgroundColor: "var(--surface-background)",
  },
  headerInfo: {},
  headerInfoBuffer: {
    height: "85px",
    width: "100%",
  },
  headerNavigation: {
    height: "35px",
  },
  headerNavigationBuffer: {
    height: "35px",
    width: "100%",
  },
  entityWrapper: {
    display: "flex",
    flexDirection: "row-reverse",
    flexGrow: "1",
  },
  entityContent: {
    display: "flex",
    flexDirection: "column",
    width: "0",
    minWidth: "0",
    flexGrow: "1",
  },
  entityContentColumnBase: {
    marginTop: "20px",
  },
  entityContentColumnNarrow: {
    width: "500px",
  },
  entityContentColumnFeedWider: {
    width: "calc(100% - 40px)",
    maxWidth: "680px",
  },
  entityContentColumnWide: {
    width: "calc(100% - 40px)",
    maxWidth: "806px",
  },
  entityContentColumnFullWithMargins: {
    width: "calc(100% - 40px)",
  },
  entityContentColumnFull: {
    width: "100%",
  },
  entityContentStretchedCenterContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  quickChatBuffer: {
    height: "44px",
    flexShrink: 0,
  },
  fixedBannerContainer: {
    position: "fixed",
    width: "100%",
    zIndex: "10",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
    backgroundColor: "var(--wig-page-background)",
  },
  fixedBannerContainerNarrow: {
    height: "22px",
  },
  quickchatWrapper: {
    bottom: "0",
    height: "0",
    position: "fixed",
    width: "0",
    zIndex: "3",
    right: "0",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media print": {
      display: "none",
    },
  },
  quickchatWrapperFixedWidth: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      right: "calc((100vw - 1600px) / 2)",
    },
  },
  quickchatInner: {
    position: "absolute",
    height: "44px",
    width: "292px",
    right: "0",
  },

  dummy1: {
    width: "100%",
    height: "100%",
  },
});

// const u = c("GalileoNavFeatureGating").isGalileoNavMode(
//   "employee_appbar_on_workplace"
// );
const isGalileoNavMode = false;

const _2401 = true;

const B = 22;

const D = Locale.isRTL() ? "right" : "left";
const E = Locale.isRTL() ? "marginRight" : "marginLeft";
const F = executionEnvironment.canUseDOM ? supportsCSSSticky : true;

const P = isGalileoNavMode
  ? React.createContext({
      entity: w,
      leftNav: v + t,
    })
  : React.createContext({
      entity: w,
      leftNav: v + s,
    });

const GeminiLayoutPageHeader = memo(
  // eslint-disable-next-line complexity
  ({
    children,
    coverPhoto,
    footer,
    hasContrastBackgroundColor = false,
    testid,
    topBanner,
  }) => {
    const { hasCoverPhoto, hasHeaderTabs, intersectionObserverRef } =
      GeminiLayoutHeaderContext.useGeminiLayoutHeader();

    const isFullWidth = useGeminiLayoutIsFullWidth();

    let hasRiverKnight =
      GeminiLayoutFullWidthModeContext.useGeminiLayoutUserSettingsFullWidthMode();

    const q = useGeminiLayoutHorizontalScrolling();

    const r =
      useGeminiLayoutIntersectionObserverForSticky.useGeminiLayoutIsSticky();

    let { entity } = useContext(P);

    let v = GeminiLayoutHasFixedBannerContext.useGeminiLayoutHasFixedBanner();

    const s =
      hasCoverPhoto && coverPhoto ? (
        <div className="x1vd4hg5 xh8yej3 x1n2onr6">{coverPhoto}</div>
      ) : null;

    const i = useMemo(() => {
      let b = I({
        hasHeaderTabs,
      });

      if (F) {
        return {
          height: b,
        };
      } else {
        let a = {};
        a[E] = r !== true ? "auto" : -q;
        a.maxWidth = r && !isFullWidth ? 1600 : undefined;
        a.minWidth = r && !isFullWidth ? "auto" : "0";
        a.width = entity;
        a.height = b;
        a.top = v ? B : 0;

        return a;
      }
    }, [hasHeaderTabs, r, q, isFullWidth, entity, v]);

    const e = (
      <>
        <CometBase ref={intersectionObserverRef} />
        {!r && topBanner}
        {s}
        {r && topBanner}
        {!F && r ? <div className="xcbkimw xh8yej3" /> : null}
        {!F && r ? <div className="x1s1d1n7 xh8yej3" /> : null}
        <div
          className={stylex(
            styles.headerContents,
            hasContrastBackgroundColor &&
              styles.headerContentsConstrastBackground,
            !F && r && styles.headerFixed,
            isGalileoNavMode && !F && r && styles.headerFixedWP4MAppBar,
            !F && hasRiverKnight && r && styles.headerFixedFluid,
            isGalileoNavMode &&
              !F &&
              hasRiverKnight &&
              r &&
              styles.headerFixedFluidWP4MAppBar
          )}
          data-testid={undefined}
          style={i}
        >
          <div className="">
            {children}
            {footer && <div className="x1s1d1n7">{footer}</div>}
          </div>
        </div>
      </>
    );

    const a = Q();

    return _2401 ? <div ref={a}>{e}</div> : e;
  }
);

const I = ({ hasHeaderTabs }) => {
  return hasHeaderTabs ? y + z : y;
};

const Q = () => {
  let [b, a] = useState(null);

  const { setHeight } =
    GeminiLayoutHeaderHeightContext.useGeminiLayoutHeaderHeight();

  useLayoutEffect(() => {
    let a = !b ? undefined : b.getBoundingClientRect();
    // eslint-disable-next-line no-cond-assign
    setHeight((a = !a ? undefined : a.height) ? a : 0);
  }, [b, setHeight]);

  return a;
};

const _GeminiLayoutPage = memo(
  ({
    channelContent,
    children,
    fixedBannerContent,
    mainNavContent,
    navContentAndChannelContainer,
  }) => {
    const { isAutoHideEnabled } = GeminiNavAndChannelContext.useNavUIState();
    const k = useGeminiLayoutIsFullWidth();
    const m =
      useGeminiLayoutHorizontalScrolling.useGeminiLayoutHorizontalScrollingListener();
    const [n, o, q, x] = useGeminiLayoutChannelMeasureListenerForNonSticky(
      isGalileoNavMode ? v + t : v + s,
      w,
      isAutoHideEnabled
    );

    let y = useMemo(() => {
      return {
        leftNav: q,
        entity: x - q,
      };
    }, [x, q]);

    let z = !!fixedBannerContent;

    let A = U({
      hasFixedBanner: z,
    });

    let B = useMemo(() => {
      return {
        bottom: 0,
        left: 0,
        right: 0,
        top: A,
      };
    }, [A]);

    let C = T(z, styles.contentWithTopBannerNarrowBuffer);

    return (
      <GeminiLayoutNonResponsivenessWrappers.GeminiLayoutPageWrapper
        children={() => {
          // GeminiAccessibilitySkipToContent
          // b('cr:2287') && jsx(b('cr:2287'), {}),
          return (
            // eslint-disable-next-line no-undef
            <div className={stylex.apply(undefined, arguments)} ref={o}>
              <BaseViewportMarginsContext.Provider value={B}>
                <P.Provider value={y}>
                  <GeminiLayoutHasFixedBannerContext.Provider
                    hasFixedBanner={z}
                  >
                    <useGeminiLayoutHorizontalScrolling.GeminiLayoutHorizontalScrollingContextProvider
                      value={m}
                    >
                      {fixedBannerContent && <O>{fixedBannerContent}</O>}
                      <GeminiLayoutHeaderHeightContext.Provider>
                        <CometSSRMultipassBoundary id="top_nav">
                          <VoyageUserJourneyUILayerProvider name="navigation">
                            <H
                              channelContent={channelContent}
                              hasFixedBanner={z}
                              isLayoutFullWidth={k}
                              navContent={mainNavContent}
                              navContentAndChannelContainer={
                                navContentAndChannelContainer ?? React.Fragment
                              }
                              ref={n}
                            />
                          </VoyageUserJourneyUILayerProvider>
                        </CometSSRMultipassBoundary>
                        <div
                          className={thatReturnsArgument(
                            stylex(styles.content, C)
                          )}
                        >
                          {/* // b('cr:6171') && jsx(b('cr:6171'), {}), */}
                          {children}
                        </div>
                      </GeminiLayoutHeaderHeightContext.Provider>
                    </useGeminiLayoutHorizontalScrolling.GeminiLayoutHorizontalScrollingContextProvider>
                  </GeminiLayoutHasFixedBannerContext.Provider>
                </P.Provider>
              </BaseViewportMarginsContext.Provider>
            </div>
          );
        }}
      />
    );
  }
);

function U({
  hasFixedBanner,
  hasHeaderContent = false,
  hasHeaderTabs = false,
}) {
  let d = 0;

  if (hasFixedBanner) {
    d += B;
  }

  if (!hasHeaderContent) {
    return d;
  }

  d = y;

  if (hasHeaderTabs) {
    d += z;
  }

  return d;
}

function T(a, b) {
  return !a ? null : b;
}

function O({ children }) {
  let b =
    useGeminiLayoutHorizontalScrolling.useGeminiLayoutHorizontalScrolling();
  let { entity, leftNav } = useContext(P);
  // let f = e.entity;
  // let g = e.leftNav;
  const layoutFixed =
    GeminiLayoutHasFixedBannerContext.useGeminiLayoutHasFixedBanner();
  const xstyle = T(layoutFixed, styles.fixedBannerContainerNarrow);

  let style = useMemo(() => {
    if (F) {
      return {};
    } else {
      let obj = {};

      obj[D] = b * -1;
      obj.minWidth = leftNav + entity;

      return obj;
    }
  }, [b, leftNav, entity]);

  return (
    <div className={stylex(styles.fixedBannerContainer, xstyle)} style={style}>
      {children}
    </div>
  );
}

const H = memo(
  forwardRef((props, ref) => {
    const {
      channelContent,
      hasFixedBanner,
      isLayoutFullWidth,
      navContent,
      navContentAndChannelContainer,
    } = props;

    const { isAutoHideEnabled, isChannelVisible } =
      GeminiNavAndChannelContext.useNavUIState();

    const horizontalScroll =
      useGeminiLayoutHorizontalScrolling.useGeminiLayoutHorizontalScrolling();

    let style = useMemo(() => {
      if (F) {
        return {};
      } else {
        let obj = {};
        obj[E] = isLayoutFullWidth ? -horizontalScroll : "auto";
        obj.width = "inherit";

        return obj;
      }
    }, [horizontalScroll, isLayoutFullWidth]);

    let xstyle = T(
      hasFixedBanner,
      styles.navigationInnerWithBannerNarrowBuffer
    );

    const Comp = useMemo(() => {
      let NavContentAndChannelContainer = navContentAndChannelContainer;

      return (
        <GeminiLayoutNonResponsivenessWrappers.GeminiLayoutLeftHandColumnWrapper
          ref={ref}
          children={() => {
            let args;
            // eslint-disable-next-line no-undef
            for (let e = arguments.length, g = new Array(e), h = 0; h < e; h++)
              // eslint-disable-next-line no-undef
              g[h] = arguments[h];
            return (
              <>
                {!F && (
                  <div
                    className={stylex(styles.dummy1)} /* "xh8yej3 x5yr21d" */
                  />
                )}
                <NavContentAndChannelContainer>
                  <div
                    className={stylex(
                      F ? styles.navigationSticky : styles.navigationFixed,
                      isGalileoNavMode && styles.navigationFixedWP4MAppBar
                    )}
                    style={style}
                  >
                    <div className={stylex(styles.navigationInner, xstyle)}>
                      <CometErrorBoundary>
                        <CometPagelet.Placeholder
                          className={stylex(
                            styles.navigationAppNavList,
                            isGalileoNavMode &&
                              styles.navigationAppNavListWP4MAppBar
                          )}
                          fallback={null}
                          name="GeminiLayoutNavigationAppList"
                        >
                          {navContent}
                        </CometPagelet.Placeholder>
                      </CometErrorBoundary>
                      <div
                        className={stylex.apply(
                          undefined,
                          args.concat([
                            styles.channelWrapper,
                            isAutoHideEnabled &&
                              (isChannelVisible
                                ? styles.channelWrapperAutoHideButVisible
                                : styles.channelWrapperHidden),
                            isGalileoNavMode &&
                              isAutoHideEnabled &&
                              isChannelVisible &&
                              styles.channelWrapperAutoHideButVisibleWP4MAppBar,
                          ])
                        )}
                      >
                        <CometErrorBoundary>
                          <CometPagelet.Placeholder
                            fallback={null}
                            name="GeminiLayoutNavigationChannel"
                          >
                            <VoyageUserJourneyUILayerProvider name="channel">
                              {channelContent}
                            </VoyageUserJourneyUILayerProvider>
                          </CometPagelet.Placeholder>
                        </CometErrorBoundary>
                      </div>
                    </div>
                  </div>
                </NavContentAndChannelContainer>
              </>
            );
          }}
        />
      );
    }, [
      navContentAndChannelContainer,
      ref,
      style,
      xstyle,
      navContent,
      isAutoHideEnabled,
      isChannelVisible,
      channelContent,
    ]);

    return Comp;
  })
);

export const GeminiLayoutPage = {
  GeminiLayoutPageHeader,
  GeminiLayoutPage: _GeminiLayoutPage,
};
