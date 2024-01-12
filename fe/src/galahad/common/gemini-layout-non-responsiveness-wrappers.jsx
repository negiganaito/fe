/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import {
  GeminiLayoutFullWidthModeContext,
  GeminiNavAndChannelContext,
} from "../context";

const styles = stylex.create({
  pageContainer: {
    width: "100%",
    minWidth: "1266px",
    minHeight: "100vh",
    marginTop: "0",
    marginRight: "auto",
    marginBottom: "0",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "var(--wig-page-background)",
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media print": {
      minWidth: 0,
    },
  },
  pageContainerWP4MAppBar: {
    minWidth: "1226px",
  },
  pageContainerWithoutChannel: {
    minWidth: "966px",
  },
  pageContainerWithoutChannelWP4MAppBar: {
    minWidth: "926px",
  },
  pageContainerFixedWidth: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (min-width: 1921px)": {
      width: "1600px",
    },
  },
  lhcNavigationWrapper: {
    overflowAnchor: "none",
    flexBasis: "96px",
    flexGrow: 1,
    flexShrink: 0,
    position: "relative",
    minWidth: "96px",
    maxWidth: "96px",
    // TODO : bug
    zIndex: 0,
    // zIndex: 3,
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media print": {
      display: "none",
    },
  },
  lhcNavigationWrapperWP4MAppBar: {
    flexBasis: "56px",
    minWidth: "56px",
    maxWidth: "56px",
  },
  lhcNavigatioWrapperWithChannel: {
    flexBasis: "396px",
    maxWidth: "516px",
  },
  lhcNavigatioWrapperWithChannelWP4MAppBar: {
    flexBasis: "356px",
    maxWidth: "476px",
  },
  lhcChannel: {},
  entityLayourWrapper: {},
});

// k = c("GalileoNavFeatureGating").isGalileoNavMode("employee_appbar_on_workplace"),
const k = false;

const GeminiLayoutPageWrapper = ({ children }) => {
  const { isAutoHideEnabled } = GeminiNavAndChannelContext.useNavUIState();

  const full =
    GeminiLayoutFullWidthModeContext.useGeminiLayoutUserSettingsFullWidthMode();

  return children(
    styles.pageContainer,
    k && styles.pageContainerWP4MAppBar,
    isAutoHideEnabled && styles.pageContainerWithoutChannel,
    k && isAutoHideEnabled && styles.pageContainerWithoutChannelWP4MAppBar,
    !full && styles.pageContainerFixedWidth
  );
};

const GeminiLayoutLeftHandColumnWrapper = forwardRef((props, ref) => {
  const { children } = props;

  // eslint-disable-next-line no-unused-vars
  let { isAutoHideEnabled, isChannelVisible, onMouseEnter, onMouseLeave } =
    GeminiNavAndChannelContext.useNavUIState();

  return (
    <div
      className={stylex(
        styles.lhcNavigationWrapper,
        k && styles.lhcNavigationWrapperWP4MAppBar,
        !isAutoHideEnabled && styles.lhcNavigatioWrapperWithChannel,
        k &&
          !isAutoHideEnabled &&
          styles.lhcNavigatioWrapperWithChannelWP4MAppBar
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      {children(styles.lhcChannel)}
    </div>
  );
});

export const GeminiLayoutNonResponsivenessWrappers = {
  GeminiLayoutPageWrapper,
  GeminiLayoutLeftHandColumnWrapper,
};
