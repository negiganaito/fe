/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export type CometPressableOverlayProps = {
  focusRingPosition?: 'default' | 'inset';
  focusVisible?: boolean;
  focusVisibleStyle?: any;
  hovered: boolean;
  hoveredStyle?: any;
  offset?: any;
  pressed?: boolean;
  pressedStyle?: any;
  radius?: any;
  showFocusRing?: boolean;
  showGridSignifiers?: boolean;
};

export type CometPressableProps = {
  allowClickEventPropagation?: boolean;
  children?: ((...param: any) => any) | ReactNode;
  className_DEPRECATED?: string;
  cursorDisabled?: boolean;
  xstyle?: string | ((...props: any) => any);
  display?: 'block' | 'inline';
  expanding?: string;
  hideFocusOverlay?: boolean;
  hideHoverOverlay?: boolean;
  isContainerTarget?: boolean;
  disabled?: boolean;
  linkProps?: any;
  //
  onFocusChange?: any;
  onFocusIn?: (...props: any) => any;
  onFocusOut?: (...props: any) => any;
  onFocusVisibleChange?: (...props: any) => any;
  onHoverChange?: (...props: any) => any;
  onHoverIn?: (...props: any) => any;
  onHoverOut?: (...props: any) => any;
  onPress?: (...props: any) => any;
  onPressChange?: (...props: any) => any;
  onPressIn?: (...props: any) => any;
  onPressOut?: (...props: any) => any;
  preventContextMenu?: any;
  overlayDisabled?: boolean;
  overlayOffset?: any;
  overlayFocusRingPosition?: 'inset' | 'default';
  overlayFocusVisibleStyle?: any;
  overlayHoveredStyle?: any;
  overlayPressedStyle?: any;
  overlayRadius?: any;
  suppressFocusRing?: boolean;
  testOnly_pressed?: boolean;
  testid?: any;
  onContextMenu?: (...props: any) => any;
  id?: string;
  focusable?: boolean;
  suppressHydrationWarning?: boolean;
} & {
  [key: string]: any;
};
