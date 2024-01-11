/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { createContext, forwardRef, memo } from "react";
import stylex from "@stylexjs/stylex";

import {
  GeminiLayoutFullWidthModeContext,
  GeminiLayoutHeaderContext,
} from "../context";
import { useGeminiLayoutIsFullWidth } from "../hooks/use-gemini-layout-is-full-width";

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

function a(a) {
  let b = a.children;
  let e = a.coverPhoto;
  let f = a.footer;
  let g = a.hasContrastBackgroundColor;
  g = g === void 0 ? !1 : g;
  let h = a.testid;
  h = a.topBanner;
  a = d("GeminiLayoutHeaderContext.react").useGeminiLayoutHeader();
  let i = a.hasCoverPhoto;
  let k = a.hasHeaderTabs;
  a = a.intersectionObserverRef;
  let m = c("useGeminiLayoutIsFullWidth")();
  let o = d(
    "GeminiLayoutFullWidthModeContext.react"
  ).useGeminiLayoutUserSettingsFullWidthMode();
  let q = d(
    "useGeminiLayoutHorizontalScrolling"
  ).useGeminiLayoutHorizontalScrolling();
  let r = d(
    "useGeminiLayoutIntersectionObserverForSticky"
  ).useGeminiLayoutIsSticky();
  let s = n(P);
  let t = s.entity;
  let v = d(
    "GeminiLayoutHasFixedBannerContext.react"
  ).useGeminiLayoutHasFixedBanner();
  s =
    i && e != null
      ? l.jsx("div", {
          className: "x1vd4hg5 xh8yej3 x1n2onr6",
          children: e,
        })
      : null;
  i = p(() => {
    let a;
    let b = I({
      hasHeaderTabs: k,
    });
    return F
      ? {
          height: b,
        }
      : ((a = {}),
        (a[E] = r !== !0 ? "auto" : -q),
        (a.maxWidth = r && !m ? 1600 : void 0),
        (a.minWidth = r && !m ? "auto" : "0"),
        (a.width = t),
        (a.height = b),
        (a.top = v ? B : 0),
        a);
  }, [k, r, q, m, t, v]);
  e = l.jsxs(l.Fragment, {
    children: [
      l.jsx(c("CometBase.react"), {
        ref: a,
      }),
      !r && h,
      s,
      r && h,
      !F && r
        ? l.jsx("div", {
            className: "xcbkimw xh8yej3",
          })
        : null,
      !F && r
        ? l.jsx("div", {
            className: "x1s1d1n7 xh8yej3",
          })
        : null,
      l.jsxs("div", {
        className: (j || (j = c("stylex")))(
          G.headerContents,
          g && G.headerContentsConstrastBackground,
          !F && r && G.headerFixed,
          u && !F && r && G.headerFixedWP4MAppBar,
          !F && o && r && G.headerFixedFluid,
          u && !F && o && r && G.headerFixedFluidWP4MAppBar
        ),
        "data-testid": void 0,
        style: i,
        children: [
          l.jsx("div", {
            className: "",
            children: b,
          }),
          f != null
            ? l.jsx("div", {
                className: "x1s1d1n7",
                children: f,
              })
            : null,
        ],
      }),
    ],
  });
  a = Q();
  return c("gkx")("2401")
    ? l.jsx("div", {
        ref: a,
        children: e,
      })
    : e;
}

export const GeminiLayoutPageHeader = ({
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
};
