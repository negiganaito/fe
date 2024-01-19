/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { ChannelGeminiUIChannelHeader } from "./channel-gemini-ui-channel-header";
import { GeminiLayoutNonResponsiveLHCScrollableArea } from "./gemini-layout-non-responsive-lhc-scrollable-area";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  foot: {
    // x2lah0s,
    flexShrink: 0,
  },
});

export const ChannelGeminiUIChannelRoot = forwardRef((props, ref) => {
  const {
    children,
    footer,
    forceBrowserDefaultScrollbar,
    hasTopShadow = true,
    scrollRef,
    // eslint-disable-next-line no-unused-vars
    testid,
    ...rest
  } = props;

  return (
    <div className={stylex(styles.root)} ref={ref}>
      <ChannelGeminiUIChannelHeader {...rest} />
      <GeminiLayoutNonResponsiveLHCScrollableArea.GeminiLayoutResponsiveLHCScrollableAreaForLargeScreens
        expanding
        forceBrowserDefault={forceBrowserDefaultScrollbar}
        scrollRef={scrollRef}
        scrollTracePolicy="gemini.UIChannelRoot.scroll"
        withTopShadow={hasTopShadow}
      >
        {children}
      </GeminiLayoutNonResponsiveLHCScrollableArea.GeminiLayoutResponsiveLHCScrollableAreaForLargeScreens>
      <div className={stylex(styles.foot)}>{footer}</div>
    </div>
  );
});
