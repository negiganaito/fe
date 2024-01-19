/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    msOverflowStyle: "-ms-autohiding-scrollbar",
    alignItems: "stretch",
    backgroundColor: "var(--wig-nav-background)",
    boxSizing: "border-box",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    overflowX: "hidden",
    overflowY: "auto",
    paddingBottom: "16px",
    paddingTop: "16px",
    width: "96px",
    zIndex: 1,
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: "var(--divider)",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: "var(--divider)",
    height: "100%",
  },

  wrapper: {
    borderRightStyle: "none",
    display: "flex",
    width: "100%",
    paddingRight: "4px",
    paddingLeft: "4px",
  },
});

const GeminiNavigationNavArea = ({ children, onMouseEnter }) => {
  return (
    <div
      style={{}}
      aria-label={fbt("Workplace", "Workplace")}
      className={stylex(styles.root)}
      onMouseEnter={onMouseEnter}
      role="navigation"
    >
      <div className={stylex(styles.wrapper)}>{children}</div>
    </div>
  );
};

export const GeminiLayoutNonResponsivenessNavigationExternal = {
  GeminiNavigationNavArea,
};
