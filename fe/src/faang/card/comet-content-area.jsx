/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";

import { CometSection } from "./comet-section";

const styles = stylex.create({
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    minHeight: "inherit",
    width: "100%",
  },
  contentArea: {
    alignItems: "stretch",
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    minHeight: "inherit",
  },
  contentCentered: {
    justifyContent: "center",
  },
  fullHeight: {
    height: "100%",
  },
});

export const CometContentArea = (props) => {
  const {
    applyFullHeight = false,
    children,
    hasNoRole = false,
    // eslint-disable-next-line no-unused-vars
    testid,
    verticalAlign = "top",
  } = props;

  return (
    <div
      className={stylex(
        styles.contentArea,
        applyFullHeight && styles.fullHeight
      )}
      data-testid={undefined}
    >
      <CometSection
        className={stylex(
          styles.content,
          verticalAlign === "middle" && styles.contentCentered
        )}
        role={hasNoRole ? undefined : "main"}
      >
        {children}
      </CometSection>
    </div>
  );
};
