/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from "@stylexjs/stylex";

import React, { useRef, forwardRef } from "react";
import { CometPressable } from "@/faang/pressable";
import { BaseRow, BaseRowItem } from "@/faang/base-row";
import { stylexCompat } from "../utils";

import { jsx, jsxs } from "react/jsx-runtime";

const styles = stylex.create({
  button: {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  content: {
    borderRadius: "var(--button-corner-radius)",
    borderWidth: "0",

    boxSizing: "border-box",
    paddingRight: "12px",
    paddingLeft: "12px",
  },
  disabled: {
    backgroundColor: "var(--disabled-button-background)",
  },
  item: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    marginRight: "var(--button-inner-icon-spacing-medium)",
    marginLeft: "var(--button-inner-icon-spacing-medium)",
  },
  offset: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginRight: "calc(-1*var(--button-inner-icon-spacing-medium))",
    marginLeft: "calc(-1*var(--button-inner-icon-spacing-medium))",
    width: "calc(100% + 6px)",
  },
  paddingWide: {
    paddingRight: "40px",
    paddingLeft: "40px",
  },
  sizeLargeItem: {
    marginRight: "var(--button-inner-icon-spacing-large)",
    marginLeft: "var(--button-inner-icon-spacing-large)",
  },
  sizeLargeOffset: {
    marginRight: "calc(-1*var(--button-inner-icon-spacing-large))",
    marginLeft: "calc(-1*var(--button-inner-icon-spacing-large))",
  },
});

const l = 0.96;
const m = 10;

const o = new WeakMap();

function p(a) {
  if (!a) {
    return [{}, {}];
  }
  let b = o.get(a);
  if (b) {
    return b;
  }
  b = stylex(a);

  const {
    alignSelf,
    flexBasis,
    flexGrow,
    flexShrink,
    height,
    justifySelf,
    margin,
    marginBottom,
    marginEnd,
    marginStart,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    width,
    ...restStyle
  } = b;

  const xStyleProps = {
    alignSelf,
    flexBasis,
    flexGrow,
    flexShrink,
    height,
    justifySelf,
    margin,
    marginBottom,
    marginEnd,
    marginStart,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    width,
  };

  const f = {};

  // eslint-disable-next-line guard-for-in
  for (let g in xStyleProps) {
    xStyleProps[g] !== undefined && (f[g] = xStyleProps[g]);
  }

  const i = [
    stylexCompat.makeNamespace(f),
    stylexCompat.makeNamespace(restStyle),
  ];

  o.set(a, i);
  return i;
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseStyledButtonProps>
 */
export const BaseStyledButton = forwardRef((props, ref) => {
  const {
    addOnAbsolute,
    addOnEnd,
    addOnStart,
    content,
    contentXstyle,
    disabled = false,
    display = "inline",
    focusable,
    icon,
    id,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    overlayHoveredStyle,
    overlayPressedStyle,
    padding = "normal",
    size = "medium",
    suppressHydrationWarning = false,
    testOnly_pressed = false,
    xstyle,
    ...rest
  } = props;

  const childRef = useRef(null);
  const onPressInInternal = (event) => {
    if (childRef.current) {
      childRef.current.style.transform =
        "scale(" +
        Math.max(
          l,
          (childRef.current.offsetWidth - m) / childRef.current.offsetWidth
        ) +
        ")";
    }
    typeof onPressIn === "function" && onPressIn(event);
  };

  const onPressOutInternal = (event) => {
    if (childRef.current) {
      childRef.current.style.transform = "none";
    }
    typeof onPressOut === "function" && onPressOut(event);
  };

  const [M, _N] = p(xstyle);

  const N = [styles.item, size === "large" && styles.sizeLargeItem];

  const child = (childProps) => {
    const { overlay } = childProps;

    return jsxs(BaseRow, {
      align: "center",
      ref: childRef,
      verticalAlign: "center",
      xstyle: [
        styles.content,
        padding === "wide" && styles.paddingWide,
        disabled && styles.disabled,
        _N,
        contentXstyle,
      ],
      children: [
        jsxs("div", {
          className: stylex([
            styles.offset,
            size === "large" && styles.sizeLargeOffset,
          ]),
          children: [
            addOnStart
              ? jsx(BaseRowItem, {
                  role: "none",
                  useDeprecatedStyles: true,
                  xstyle: N,
                  children: addOnStart,
                })
              : icon
              ? jsx(BaseRowItem, {
                  role: "none",
                  useDeprecatedStyles: true,
                  xstyle: N,
                  children: icon,
                })
              : null,
            content &&
              jsx(BaseRowItem, {
                role: "none",
                useDeprecatedStyles: true,
                xstyle: N,
                children: content,
              }),
            addOnEnd &&
              jsx(BaseRowItem, {
                role: "none",
                useDeprecatedStyles: true,
                xstyle: N,
                children: addOnEnd,
              }),
          ],
        }),
        overlay,
        addOnAbsolute && addOnAbsolute,
      ],
    });
  };

  return (
    <CometPressable
      {...rest}
      disabled={disabled}
      display={display}
      focusable={focusable}
      id={id}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressInInternal}
      onPressOut={onPressOutInternal}
      overlayHoveredStyle={overlayHoveredStyle}
      overlayPressedStyle={overlayPressedStyle}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={[styles.button, M]}
    >
      {child}
    </CometPressable>
  );
});
