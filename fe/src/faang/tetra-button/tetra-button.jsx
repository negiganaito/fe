/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-undef */

import React, { forwardRef, useContext, useRef } from "react";
import stylex from "@stylexjs/stylex";

import { CometTooltip } from "@/faang/base-tooltip";
import { CometGHLRenderingContext } from "@/faang/context";
import {
  isBlueprintStylesEnabled,
  mergeRefs,
  useCometTheme,
} from "@/faang/hooks";
import { CometIcon } from "@/faang/icon";

import { TetraText } from "../tetra-text";

import { BaseStyledButton } from "./base-styled-button";

const colorStyles = stylex.create({
  contentDisabled: {
    opacity: ".3",
  },
  darkOverlay: {
    backgroundColor: "var(--always-dark-overlay)",
    color: "var(--always-white)",
  },
  darkOverlayPressed: {
    backgroundColor: "var(--non-media-pressed)",
  },
  disabled: {
    backgroundColor: "var(--disabled-button-background)",
  },
  fdsOverrideBlack: {
    backgroundColor: "var(--always-black)",
  },
  fdsOverrideCollaborativePostCTA: {
    backgroundColor: "var(--always-white)",
    mixBlendMode: "lighten",
  },
  fdsOverrideNegative: {
    backgroundColor: "var(--negative)",
  },
  fdsOverridePositive: {
    backgroundColor: "var(--positive)",
  },
  overlay: {
    backgroundColor: "var(--always-white)",
  },
  overlayDeemphasized: {
    backgroundColor: "var(--always-light-overlay)",
  },
  overlayDeemphasizedOverlayPressed: {
    backgroundColor: "var(--always-light-overlay)",
  },
  overlayDisabled: {
    backgroundColor: "var(--progress-ring-on-media-background)",
  },
  overlayOverlayPressed: {
    backgroundColor: "var(--shadow-1)",
  },
  paddingIconOnly: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  primary: {
    backgroundColor: "var(--primary-button-background)",
  },
  primaryDeemphasized: {
    backgroundColor: "var(--primary-deemphasized-button-background)",
  },
  primaryDeemphasizedOverlayPressed: {
    backgroundColor: "var(--primary-deemphasized-button-pressed-overlay)",
  },
  primaryOverlayPressed: {
    backgroundColor: "var(--press-overlay)",
  },
  secondary: {
    backgroundColor: "var(--secondary-button-background)",
  },
  secondaryDeemphasized: {
    backgroundColor: "transparent",
  },
  secondaryDeemphasizedOverlayPressed: {
    backgroundColor: "var(--primary-deemphasized-button-pressed-overlay)",
  },
  secondaryOverlayPressed: {
    backgroundColor: "var(--press-overlay)",
  },
  sizeLarge: {
    height: "var(--button-height-large)",
  },
  sizeMedium: {
    height: "var(--button-height-medium)",
  },
});

const sizeStyles = stylex.create({
  sizeLarge: {
    borderRadius: "var(--button-corner-radius-large)",
    height: "var(--blueprint-button-height-large)",
  },
  sizeMedium: {
    borderRadius: "var(--button-corner-radius-medium)",
    height: "var(--blueprint-button-height-medium)",
  },
});

const n = {
  ":deemphasized": {
    iconColor: "highlight",
    overlayPressedStyle: colorStyles.primaryDeemphasizedOverlayPressed,
    textColor: "highlight",
  },
  ":disabled": {
    iconColor: "disabled",
    textColor: "disabled",
  },
  iconColor: "white",
  overlayPressedStyle: colorStyles.primaryOverlayPressed,
  textColor: "white",
};

const o = {
  ":deemphasized": {
    iconColor: "highlight",
    overlayPressedStyle: colorStyles.secondaryDeemphasizedOverlayPressed,
    textColor: "highlight",
  },
  ":disabled": {
    iconColor: "disabled",
    textColor: "disabled",
  },
  iconColor: "primary",
  overlayPressedStyle: colorStyles.secondaryOverlayPressed,
  textColor: "secondary",
};

const p = {
  ":deemphasized": {
    iconColor: "white",
    overlayPressedStyle: colorStyles.overlayDeemphasizedOverlayPressed,
    textColor: "white",
  },
  ":disabled": {
    iconColor: "disabled",
    textColor: "disabled",
  },
  iconColor: "primary",
  overlayPressedStyle: colorStyles.overlayOverlayPressed,
  textColor: "primary",
};

const q = {
  ":deemphasized": {
    iconColor: "white",
    overlayPressedStyle: colorStyles.overlayDeemphasizedOverlayPressed,
    textColor: "white",
  },
  ":disabled": {
    iconColor: "disabled",
    textColor: "disabled",
  },
  iconColor: "white",
  overlayPressedStyle: colorStyles.darkOverlayPressed,
  textColor: "white",
};

function r(a) {
  switch (a) {
    case "fdsOverride_collaborativePostCTA":
    case "secondary":
      return o;
    case "overlay":
      return p;
    case "dark-overlay":
      return q;
    case "primary":
    default:
      return n;
  }
}

function getColor(colorType, options) {
  // let c = options.disabled;
  // options = options.reduceEmphasis;
  // colorType = r(colorType);

  const val = r(colorType);
  const { disabled, reduceEmphasis } = options;

  return (
    (disabled ? val[":disabled"] : null) ||
    (reduceEmphasis ? val[":deemphasized"] : null) ||
    val
  );
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").TetraButtonProps>
 */
// eslint-disable-next-line no-unused-vars, complexity
export const TetraButton = forwardRef((props, ref) => {
  const {
    addOnPrimary,
    addOnSecondary,
    disabled = false,
    icon,
    id,
    label,
    labelIsHidden = false,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    padding = "normal",
    reduceEmphasis = false,
    size = "medium",
    suppressHydrationWarning = false,
    // eslint-disable-next-line no-unused-vars
    testid,
    testOnly_pressed,
    type = "primary",
    tooltip,
    tooltipPosition = "above",
    ...rest
  } = props;

  let { iconColor, overlayPressedStyle, textColor } = getColor(type, {
    disabled,
    reduceEmphasis,
  });

  const internalRef = useRef(null);

  const [ThemeWrapper, themeClassName] = useCometTheme("light");

  const cometGHLRenderingWithLink =
    linkProps && useContext(CometGHLRenderingContext);
  const _label = rest["aria-label"] ?? label; // N

  // let N = useContext(CometGHLRenderingContext);
  // N = q && N;
  // let d = rest["aria-label"] ?? label;
  // N = N ? undefined : d;

  const TetraButtonChildren = (
    <BaseStyledButton
      {...rest}
      addOnStart={addOnPrimary}
      addOnEnd={addOnSecondary}
      aria-label={cometGHLRenderingWithLink ? undefined : _label}
      content={
        labelIsHidden ? null : (
          <TetraText
            color={textColor}
            numberOfLines={1}
            type={size === "large" ? "button1" : "button2"}
          >
            {label}
          </TetraText>
        )
      }
      contentXstyle={[
        type === "overlay" && disabled && colorStyles.contentDisabled,
        type === "overlay" && themeClassName,
        size === "medium" &&
          (isBlueprintStylesEnabled()
            ? sizeStyles.sizeMedium
            : colorStyles.sizeMedium),
        size === "large" &&
          (isBlueprintStylesEnabled()
            ? sizeStyles.sizeLarge
            : colorStyles.sizeLarge),
        icon && labelIsHidden && colorStyles.paddingIconOnly,
      ]}
      disabled={disabled}
      icon={icon && <CometIcon color={iconColor} icon={icon} size={16} />}
      id={id}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayPressedStyle={overlayPressedStyle}
      padding={padding}
      ref={mergeRefs(internalRef, ref)}
      suppressHydrationWarning={suppressHydrationWarning}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={[
        type === "primary" && colorStyles.primary,
        type === "primary" && reduceEmphasis && colorStyles.primaryDeemphasized,
        type === "secondary" && colorStyles.secondary,
        type === "secondary" &&
          reduceEmphasis &&
          colorStyles.secondaryDeemphasized,
        type === "fdsOverride_black" && colorStyles.fdsOverrideBlack,
        type === "fdsOverride_negative" && colorStyles.fdsOverrideNegative,
        type === "fdsOverride_positive" && colorStyles.fdsOverridePositive,
        type === "fdsOverride_collaborativePostCTA" &&
          colorStyles.fdsOverrideCollaborativePostCTA,
        type === "overlay" && colorStyles.overlay,
        type === "overlay" && reduceEmphasis && colorStyles.overlayDeemphasized,
        disabled && colorStyles.disabled,
        type === "overlay" && disabled && colorStyles.overlayDisabled,
        type === "dark-overlay" && colorStyles.darkOverlay,
      ]}
    />
  );

  const TetraButtonChildrenWithTheme =
    type === "overlay" ? (
      <ThemeWrapper>{TetraButtonChildren}</ThemeWrapper>
    ) : (
      TetraButtonChildren
    );

  return tooltip ? (
    <CometTooltip position={tooltipPosition} tooltip={tooltip}>
      {TetraButtonChildrenWithTheme}
    </CometTooltip>
  ) : (
    TetraButtonChildrenWithTheme
  );
});

// const tetraButtonChildren = jsx(BaseStyledButton, {
//   ...rest,
//   addOnEnd: addOnSecondary,
//   addOnStart: addOnPrimary,
//   "aria-label": cometGHLRenderingWithLink ? undefined : _label,
//   content: labelIsHidden
//     ? null
//     : jsx(TetraText, {
//         color: textColor,
//         numberOfLines: 1,
//         type: size === "large" ? "button1" : "button2",
//         children: label,
//       }),
//   contentXstyle: [
//     type === "overlay" && disabled && colorStyles.contentDisabled,
//     type === "overlay" && themeClassName,
//     size === "medium" &&
//       (isBlueprintStylesEnabled()
//         ? sizeStyles.sizeMedium
//         : colorStyles.sizeMedium),
//     size === "large" &&
//       (isBlueprintStylesEnabled()
//         ? sizeStyles.sizeLarge
//         : colorStyles.sizeLarge),
//     icon && labelIsHidden && colorStyles.paddingIconOnly,
//   ],
//   disabled,
//   icon:
//     icon &&
//     jsx(CometIcon, {
//       color: iconColor,
//       icon,
//       size: 16,
//     }),
//   id,
//   linkProps,
//   onFocusIn,
//   onFocusOut,
//   onHoverIn,
//   onHoverOut,
//   onPress,
//   onPressIn,
//   onPressOut,
//   overlayPressedStyle: overlayPressedStyle,
//   padding,
//   ref: mergeRefs(internalRef, ref),
//   suppressHydrationWarning,
//   testOnly_pressed,
//   testid: undefined,
//   xstyle: [
//     type === "primary" && colorStyles.primary,
//     type === "primary" && reduceEmphasis && colorStyles.primaryDeemphasized,
//     type === "secondary" && colorStyles.secondary,
//     type === "secondary" &&
//       reduceEmphasis &&
//       colorStyles.secondaryDeemphasized,
//     type === "fdsOverride_black" && colorStyles.fdsOverrideBlack,
//     type === "fdsOverride_negative" && colorStyles.fdsOverrideNegative,
//     type === "fdsOverride_positive" && colorStyles.fdsOverridePositive,
//     type === "fdsOverride_collaborativePostCTA" &&
//       colorStyles.fdsOverrideCollaborativePostCTA,
//     type === "overlay" && colorStyles.overlay,
//     type === "overlay" && reduceEmphasis && colorStyles.overlayDeemphasized,
//     disabled && colorStyles.disabled,
//     type === "overlay" && disabled && colorStyles.overlayDisabled,
//     type === "dark-overlay" && colorStyles.darkOverlay,
//   ],
// });
