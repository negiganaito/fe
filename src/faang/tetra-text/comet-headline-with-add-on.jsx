/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";

import { BaseRow, BaseRowItem } from "../base-row";

import { TetraText } from ".";

const directionStyles = stylex.create({
  ltr: {
    direction: "ltr",
  },
  rtl: {
    direction: "rtl",
  },
});

const styles = stylex.create({
  addOn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "8px",
  },
  nonBreakingSpace: {
    visibility: "hidden",
    width: "0",
  },
  textFlexFixForIE: {
    flexBasis: "auto",
  },
});

export const CometHeadlineWithAddOn = forwardRef(
  (
    {
      numberOfLines,
      addOn,
      children,
      color,
      headlineRef,
      isPrimaryHeading,
      isSemanticHeading,
      type,
    },
    ref
  ) => {
    return (
      <TetraText ref={ref} isSemanticHeading={false} type={type}>
        <BaseRow
          verticalAlign="center"
          xstyle={Locale.isRTL() ? directionStyles.rtl : directionStyles.ltr}
        >
          <BaseRowItem expanding={true} xstyle={styles.textFlexFixForIE}>
            <TetraText
              color={color}
              isPrimaryHeading={isPrimaryHeading}
              isSemanticHeading={isSemanticHeading}
              numberOfLines={numberOfLines}
              ref={headlineRef}
              type={type}
            >
              {children}
            </TetraText>
            <BaseRowItem verticalAlign="top" xstyle={styles.addOn}>
              <BaseRow verticalAlign="center">
                <BaseRowItem xstyle={styles.nonBreakingSpace}>\xa0</BaseRowItem>
                <BaseRowItem>
                  <BaseRow>{addOn}</BaseRow>
                </BaseRowItem>
              </BaseRow>
            </BaseRowItem>
          </BaseRowItem>
        </BaseRow>
      </TetraText>
    );
  }
);

CometHeadlineWithAddOn.displayName = "CometHeadlineWithAddOn.react";
