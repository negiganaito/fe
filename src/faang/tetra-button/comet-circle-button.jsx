/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { CometIcon } from "../icon";
import { CometPressable } from "../pressable";

const overlayStyles = stylex.create({
  pressableOverlayPressed: {
    backgroundColor: "var(--non-media-pressed)",
  },
  pressed: {
    transform: "scale(.96)",
  },
  root: {
    alignItems: "center",
    borderRadius: "50%",
    borderWidth: "0",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    padding: 0,
    position: "relative",
  },
});

const sizeStyles = stylex.create({
  24: {
    height: "24px",
    width: "24px",
  },
  28: {
    height: "28px",
    width: "28px",
  },
  32: {
    height: "32px",
    width: "32px",
  },
  36: {
    height: "36px",
    width: "36px",
  },
  40: {
    height: "40px",
    width: "40px",
  },
  48: {
    height: "48px",
    width: "48px",
  },
});

const colorTypeStyles = stylex.create({
  "dark-overlay": {
    backgroundColor: "var(--always-dark-overlay)",
    color: "var(--always-white)",
  },
  deemphasized: {
    backgroundColor: "transparent",
  },
  "deemphasized-overlay": {
    backgroundColor: "var(--primary-deemphasized-button-background)",
  },
  normal: {
    backgroundColor: "var(--secondary-button-background)",
  },
  overlay: {
    backgroundColor: "var(--popover-background)",
    boxShadow: "0 0 0 1px var(--shadow-1)",
    color: "var(--secondary-text)",
  },
  "overlay-floating": {
    backgroundColor: "var(--secondary-button-background-floating)",
    boxShadow: "0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)",
  },
  "overlay-raised": {
    backgroundColor: "var(--popover-background)",
    boxShadow: "0 2px 8px var(--shadow-1),0 0 0 1px var(--shadow-1)",
    color: "var(--secondary-text)",
  },
  "primary-background-overlay": {
    backgroundColor: "var(--primary-button-background)",
  },
});

const disableStyles = stylex.create({
  "dark-overlay": {
    backgroundColor: "var(--always-dark-overlay)",
  },
  deemphasized: {
    backgroundColor: "transparent",
  },
  "deemphasized-overlay": {
    backgroundColor: "var(--always-light-overlay)",
  },
  normal: {
    backgroundColor: "var(--disabled-button-background)",
  },
  overlay: {
    backgroundColor: "var(--progress-ring-on-media-background)",
    borderTopWidth: "0",
    borderRightWidth: "0",
    borderBottomWidth: "0",
    borderLeftWidth: "0",
    boxShadow: "0 2px 4px var(--shadow-1)",
    color: "var(--disabled-text)",
  },
  "primary-background-overlay": {
    backgroundColor: "var(--primary-button-background)",
  },
});

const iconRatioNormal = {
  24: 12,
  28: 16,
  32: 16,
  36: 20,
  40: 20,
  48: 24,
};

const iconRatioLarge = {
  24: 20,
  28: 20,
  32: 24,
  36: 28,
  40: 32,
  48: 32,
};

export const CometCircleButton = forwardRef(
  (
    {
      "aria-hidden": ariaHidden,
      "aria-pressed": ariaPressed,
      color,
      dataAttributes,
      disabled = false,
      focusable,
      icon,
      iconRatio,
      label,
      linkProps,
      onFocusIn,
      onFocusOut,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressIn,
      onPressOut,
      overlayHoveredStyle,
      size,
      testid,
      testOnly_pressed,
      type = "normal",
      ...rest
    },
    ref
  ) => {
    const dataArr = dataAttributes
      ? Object.keys(dataAttributes).reduce((arr, key) => {
          if (arr && key) {
            arr["data" + key] = dataAttributes[key];
          }
          return arr;
        }, {})
      : null;

    const PressableChildren = (
      <CometPressable
        aria-hidden={ariaHidden}
        aria-label={label}
        aria-pressed={ariaPressed}
        disabled={disabled}
        display="inline"
        focusable={focusable}
        linkProps={linkProps}
        onFocusIn={onFocusIn}
        onFocusOut={onFocusOut}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        overlayHoveredStyle={overlayHoveredStyle}
        overlayPressedStyle={overlayStyles.pressableOverlayPressed}
        overlayRadius="50%"
        ref={ref}
        testOnly_pressed={testOnly_pressed}
        testid={undefined}
        xstyle={(classProps) => {
          const { pressed } = classProps;

          return [
            overlayStyles.root,
            sizeStyles[size],
            colorTypeStyles[type],
            disabled &&
              disableStyles[
                type === "overlay-raised" || type === "overlay-floating"
                  ? "overlay"
                  : type
              ],
            pressed && overlayStyles.pressed,
          ];
        }}
      >
        <CometIcon
          color={disabled ? "disabled" : color ? color : getColorByType(type)}
          size={
            iconRatio === "large" ? iconRatioLarge[size] : iconRatioNormal[size]
          }
          icon={icon}
        />
      </CometPressable>
    );

    return dataArr ? (
      <div {...dataArr}>{PressableChildren}</div>
    ) : (
      PressableChildren
    );
  }
);

/**
 *
 * @param { 'normal' | 'dark-overlay'| 'deemphasized'| 'deemphasized-overlay' | 'overlay'| 'overlay-floating' | 'overlay-raised'| 'primary-background-overlay'} type
 */
function getColorByType(type) {
  switch (type) {
    case "dark-overlay":
      return "white";
    case "deemphasized-overlay":
      return "highlight";
    default:
      return "primary";
  }
}
