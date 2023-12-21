/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export type BaseStyledButtonProps = {
  addOnEnd?: any;
  addOnStart?: any;
  addOnAbsolute?: any;
  content: ReactNode;
  contentXstyle?: string;
  disabled?: boolean;
  display?: "inline" | "block";
  focusable?: boolean;
  icon?: ReactNode;
  id?: string;
  linkProps?: any;
  onFocusIn?: (...props: any) => any;
  onFocusOut?: (...props: any) => any;
  onHoverIn?: (...props: any) => any;
  onHoverOut?: (...props: any) => any;
  onPress?: (...props: any) => any;
  onPressIn?: (...props: any) => any;
  onPressOut?: (...props: any) => any;
  overlayHoveredStyle?: CSSProperties;
  overlayPressedStyle?: CSSProperties;
  padding?: "wide" | "normal";
  size?: string;
  suppressHydrationWarning?: boolean;
  testOnly_pressed?: boolean;
  xstyle?: any;
};

export type TetraButtonProps = {
  addOnPrimary?: any;
  addOnSecondary?: any;
  disabled?: boolean;
  icon?: any;
  id?: string;
  label?: string;
  labelIsHidden?: boolean;
  linkProps?: any;
  onFocusIn?: (props: any) => any;
  onFocusOut?: (props: any) => any;
  onHoverIn?: (props: any) => any;
  onHoverOut?: (props: any) => any;
  onPress?: (props: any) => any;
  onPressIn?: (props: any) => any;
  onPressOut?: (props: any) => any;
  padding?: "wide" | "normal";
  reduceEmphasis?: boolean;
  size?: "medium" | "large";
  suppressHydrationWarning?: boolean;
  testid?: string;
  testOnly_pressed?: boolean;
  type?:
    | "primary"
    | "overlay"
    | "secondary"
    | "fdsOverride_black"
    | "fdsOverride_negative"
    | "fdsOverride_positive"
    | "fdsOverride_collaborativePostCTA"
    | "dark-overlay";

  "aria-label"?: string;

  //

  tooltip?: any;
  tooltipPosition?: "end" | "start" | "above" | "below";
};
