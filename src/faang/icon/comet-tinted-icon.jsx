/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable no-unused-vars */
/* eslint-disable @stylexjs/valid-styles */

import stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";

import { BaseImage_DEPRECATED } from "@/faang/base-image/base-image_DEPRECATED";

import { TintableIconSource } from "./tintable-icon-source";

const imageStyles = stylex.create({
  image: {
    verticalAlign: "-0.25em",
  },
});

const filterStyles = stylex.create({
  accent: {
    WebkitFilter: "var(--filter-accent)",
    filter: "var(--filter-accent)",
  },
  blueLink: {
    WebkitFilter: "var(--filter-blue-link-icon)",
    filter: "var(--filter-blue-link-icon)",
  },
  disabled: {
    WebkitFilter: "var(--filter-disabled-icon)",
    filter: "var(--filter-disabled-icon)",
  },
  negative: {
    WebkitFilter: "var(--filter-negative)",
    filter: "var(--filter-negative)",
  },
  placeholder: {
    WebkitFilter: "var(--filter-placeholder-icon)",
    filter: "var(--filter-placeholder-icon)",
  },
  positive: {
    WebkitFilter: "var(--filter-positive)",
    filter: "var(--filter-positive)",
  },
  primary: {
    WebkitFilter: "var(--filter-primary-icon)",
    filter: "var(--filter-primary-icon)",
  },
  primaryAccent: {
    WebkitFilter: "var(--filter-primary-accent)",
    filter: "var(--filter-primary-accent)",
  },
  secondary: {
    WebkitFilter: "var(--filter-secondary-icon)",
    filter: "var(--filter-secondary-icon)",
  },
  warning: {
    WebkitFilter: "var(--filter-warning-icon)",
    filter: "var(--filter-warning-icon)",
  },
  white: {
    WebkitFilter: "var(--filter-always-white)",
    filter: "var(--filter-always-white)",
  },
});

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometTintedIconProps>
 */
export const CometTintedIcon = forwardRef((props, ref) => {
  const { alt = "", color = "black", draggable, icon, testid, xstyle } = props;

  const tintableIconSource = icon instanceof TintableIconSource;

  return jsx(BaseImage_DEPRECATED, {
    ...stylex.props(
      imageStyles.image,
      tintableIconSource && color !== "black" && filterStyles[color],
      xstyle
    ),
    alt,
    // className: mergeClasses(
    //   classes.image,
    //   tintableIconSource && color !== 'black' && filterClasses[color],
    //   className
    // ),
    draggable,
    ref,
    src: icon.src,
    testid: undefined,
  });
});

CometTintedIcon.displayName = "CometTintedIcon.react";
