/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  listItem: {
    listStyleType: "none",
  },

  default: {
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    minHeight: 0,
    minWidth: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: "relative",
    zIndex: 0,
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  withTopSpacing: {
    marginTop: ".25rem",
  },

  sub: {
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",

    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,

    boxSizing: "border-box",

    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    minHeight: 0,
    minWidth: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: "relative",
    zIndex: "unset",
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const WorkGalahadUIAppsListItem = forwardRef(
  ({ withTopSpacing, children, testid }, ref) => {
    return (
      <div
        data-testid={undefined}
        role="row"
        className={stylex(
          styles.listItem,
          withTopSpacing && styles.withTopSpacing
        )}
        ref={ref}
      >
        <div className={stylex(styles.sub)} role="gridcell">
          {children}
        </div>
      </div>
    );
  }
);
