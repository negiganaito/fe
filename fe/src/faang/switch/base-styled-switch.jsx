/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";

import { BaseRow, BaseRowItem, BaseView } from "@/faang/base-row";

import { BaseSwitch } from "./base-switch";

const styles = stylex.create({
  alignIcon: {
    alignItems: "center",
  },
  background: {
    backgroundColor: "var(--switch-active)",
    bottom: "0",
    boxSizing: "border-box",
    right: 0,
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    left: 0,
    top: 0,
    transitionDuration: "var(--fds-duration-extra-short-out)",
    transitionProperty: "opacity",
    transitionTimingFunction: "var(--fds-animation-move-out)",
  },
  backgroundActive: {
    opacity: 1,
    transitionDuration: "var(--fds-duration-extra-short-in)",
    transitionTimingFunction: "var(--fds-animation-move-in)",
  },
  disabled: {
    opacity: 0.4,
    transitionDuration: "var(--fds-duration-extra-short-in)",
    transitionTimingFunction: "var(--fds-animation-move-in)",
  },
  innerShadow: {
    borderRadius: "14px",

    boxShadow: "inset 0 0 0 .5px var(--media-inner-border)",
    height: "28px",
    width: "52px",
  },
  slider: {
    backgroundColor: "var(--always-white)",
    borderRadius: "12px",

    boxShadow: "0 1px 2px var(--shadow-5)",
    height: "24px",
    pointerEvents: "none",
    position: "absolute",
    left: "2px",
    top: "2px",
    transitionDuration: "var(--fds-duration-extra-short-out)",
    transitionProperty: "transform",
    transitionTimingFunction: "var(--fds-animation-move-out)",
    width: "24px",
  },
  sliderActive: {
    transitionDuration: "var(--fds-duration-extra-short-in)",
    transitionTimingFunction: "var(--fds-animation-move-in)",
  },
  sliderActiveLeft: {
    transform: "translateX(-24px)",
  },
  sliderActiveLeftSmall: {
    transform: "translateX(-20px)",
  },
  sliderActiveRight: {
    transform: "translateX(24px)",
  },
  sliderActiveRightSmall: {
    transform: "translateX(20px)",
  },
  sliderIconContainer: {
    height: "100%",
    width: "100%",
  },
  sliderSmall: {
    height: "20px",
    width: "20px",
  },
  switch: {
    backgroundColor: "var(--divider)",
    borderRadius: "14px",

    boxSizing: "border-box",
    display: "inline-block",
    height: "28px",
    opacity: 1,
    overflowX: "hidden",
    overflowY: "hidden",
    padding: 0,

    position: "relative",
    transitionDuration: "var(--fds-duration-extra-short-out)",
    transitionProperty: "opacity",
    transitionTimingFunction: "var(--fds-animation-move-out)",
    width: "52px",
  },
  switchSmall: {
    borderRadius: "12px",
    height: "24px",
    width: "44px",
  },
});

const isRTL = Locale.isRTL(); // false;

export const BaseStyledSwitch = forwardRef(
  (
    {
      disabled = false,
      icon,
      onClick,
      onValueChange,
      size = "medium",
      tabIndex,
      testid,
      value,
      suppressFocusRing,
      xstyle,
      ...rest
    },
    ref
  ) => {
    const isSizeSmall = size === "small";

    return (
      <BaseSwitch
        {...rest}
        checked={value}
        disabled={disabled}
        onClick={onClick}
        onValueChange={onValueChange}
        ref={ref}
        suppressFocusRing={suppressFocusRing}
        tabIndex={tabIndex}
        testid={undefined}
        xstyle={[
          styles.switch,
          isSizeSmall && styles.switchSmall,
          disabled && styles.disabled,
          xstyle,
        ]}
      >
        <BaseView
          xstyle={[
            styles.innerShadow,
            isSizeSmall && styles.switchSmall,
            xstyle,
          ]}
        >
          <BaseView
            xstyle={[styles.background, value && styles.backgroundActive]}
          />
          <BaseView
            xstyle={[
              styles.slider,
              isSizeSmall && styles.sliderSmall,
              value && styles.sliderActive,
              // value && styles.sliderActiveRight,
              value &&
                (isRTL
                  ? [
                      styles.sliderActiveLeft,
                      isSizeSmall && styles.sliderActiveLeftSmall,
                    ]
                  : [
                      styles.sliderActiveRight,
                      isSizeSmall && styles.sliderActiveRightSmall,
                    ]),
              value && isSizeSmall && styles.sliderActiveRightSmall,
            ]}
          >
            {icon && (
              <BaseRow
                align="center"
                expanding={true}
                verticalAlign="center"
                xstyle={styles.sliderIconContainer}
              >
                <BaseRowItem
                  expanding={true}
                  verticalAlign="center"
                  xstyle={styles.alignIcon}
                >
                  {icon}
                </BaseRowItem>
              </BaseRow>
            )}
          </BaseView>
        </BaseView>
      </BaseSwitch>
    );
  }
);
