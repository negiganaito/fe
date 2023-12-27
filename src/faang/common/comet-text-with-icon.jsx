/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";

import { BaseView } from "../base-row";

import { CometNonBreakingSpace } from "./comet-non-breaking-space";

const styles = stylex.create({
  icon: {
    alignItems: "center",
    display: "inline-flex",
    verticalAlign: "middle",
  },
  iconContainer: {
    display: "inline",
    whiteSpace: "nowrap",
  },
});

export const CometTextWithIcon = (props) => {
  const {
    children,
    iconAfter,
    iconBefore,
    iconOverrideVerticalStyle,
    observeDirectionality = false,
    spacing = 0.5,
  } = props;

  const contentElement = (
    <>
      {iconBefore && (
        <BaseView xstyle={styles.iconContainer}>
          <BaseView xstyle={{ ...styles.icon, ...iconOverrideVerticalStyle }}>
            {iconBefore}
          </BaseView>
          <CometNonBreakingSpace size={spacing} />
        </BaseView>
      )}
      {children}
      {iconAfter && (
        <BaseView xstyle={styles.iconContainer}>
          <CometNonBreakingSpace size={spacing} />
          <BaseView xstyle={{ ...styles.icon, ...iconOverrideVerticalStyle }}>
            {iconAfter}
          </BaseView>
        </BaseView>
      )}
    </>
  );

  return observeDirectionality ? (
    <span dir="auto">{contentElement}</span>
  ) : (
    contentElement
  );
};
