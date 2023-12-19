/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";

export type BaseSVGIconProps = {
  alt?: string;
  color?: any;
  icon?: any;
  size?: any; // TODO
  xstyle?: any;
};

export type CometIconProps = {
  alt?: string;
  color:
    | "active-tab"
    | "none"
    | "black"
    | "white"
    | "baseCherry"
    | "baseLemon"
    | "baseLime"
    | "blueLink"
    | "disabled"
    | "fb-logo"
    | "highlight"
    | "inactive-tab"
    | "negative"
    | "positive"
    | "primary"
    | "white"
    | "primaryAccent"
    | "rating-star-active"
    | "secondary"
    | "tertiary"
    | "warning"
    | "work-iris";
  size:
    | 24
    | 28
    | 32
    | 36
    | 40
    | 48
    | 8
    | 10
    | 12
    | 16
    | 20
    | 18
    | 30
    | 52
    | 56
    | 60
    | 72
    | 112
    | 132;
  viewBox?: string;
  children?: ReactNode;
  component?: ReactNode;
  inline?: boolean;
  shadow?: boolean;
  icon?: any;
};

export type CometTintedIconProps = {
  alt?: string;
  color?:
    | "white"
    | "blueLink"
    | "disabled"
    | "negative"
    | "positive"
    | "primary"
    | "primaryAccent"
    | "secondary"
    | "warning"
    | "accent"
    | "placeholder"
    | "black";
  draggable?: boolean;
  icon?: any;
  testid?: string;
  xstyle?: string;
};

export type CometIconProps = {
  color: CometSVGIconColor;
  icon: any;
  size?: CometSVGIconSize;
  //
  alt?: string;
  disabled?: boolean;
  disableOverlay_DEPRECATED?: boolean;
  draggable?: boolean;
  focusable?: boolean;
  hideHoverOverlay?: boolean;
  linkProps?: any;
  onHoverIn?: (props: any) => any;
  onHoverOut?: (props: any) => any;
  onPress?: (props: any) => any;
  onPressIn?: (props: any) => any;
  onPressOut?: (props: any) => any;
  testOnly_pressed?: boolean;
  className?: string;
  testid?: string;
  "aria-label"?: string;
  iconAria?: any;
  iconBadgeAria?: any;
};
