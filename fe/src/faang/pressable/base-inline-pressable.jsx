/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { CometPressable } from "./comet-pressable";

const styles = stylex.create({
  defaultCursor: {
    cursor: "default",
  },
  disabled: {
    textDecoration: "none",
  },
  disabledColor: {
    color: "var(--disabled-text)",
  },
  disabledLink: {
    opacity: 0.5,
  },
  expanding: {
    display: "inline-flex",
  },
  link: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  linkColor: {
    color: "var(--blue-link)",
  },
  root: {
    display: "inline",
    position: "relative",
    userSelect: "none",
  },
});

// type BaseInlinePressableProps = {
//   ariaLabel?: string
//   children?: any
//   color?: string
//   cursorDisabled?: boolean
//   expanding?: boolean
//   linkProps?: any
//   onPress: any
//   className?: string
// }

export const BaseInlinePressable = forwardRef(
  (
    {
      ariaLabel,
      children,
      color = "blue",
      cursorDisabled,
      expanding = false,
      linkProps,
      onPress,
      xstyle,
      ...rest
    },
    ref
  ) => {
    const root = [
      styles.root,
      cursorDisabled === !0 && styles.defaultCursor,
      expanding && styles.expanding,
      xstyle,
    ];
    const linkColor = color !== "inherit" && (linkProps || onPress);
    return jsx(CometPressable, {
      "aria-label": ariaLabel,
      linkProps: linkProps,
      onPress: onPress,
      overlayDisabled: !0,
      ...rest,
      ref: ref,
      xstyle: function ({ disabled, hovered }) {
        return [
          root,
          linkColor && styles.linkColor,
          hovered && !disabled && styles.link,
          disabled && styles.disabled,
          disabled && !linkColor && styles.disabledColor,
          disabled && linkColor && styles.disabledLink,
        ];
      },
      children: children,
    });
  }
);
