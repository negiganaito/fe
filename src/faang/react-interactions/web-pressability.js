/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ReactContextMenuEvent } from "./react-context-menu-event";
import { ReactFocusEvent } from "./react-focus-event";
import { ReactHoverEvent } from "./react-hover-event";
import { ReactPressEvent } from "./react-press-event";

function usePressability(targetRef, options) {
  const {
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
  } = options;

  ReactHoverEvent.useHover(targetRef, {
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
  });

  ReactPressEvent.usePress(targetRef, {
    disabled,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
  });

  ReactFocusEvent.useFocus(targetRef, {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  });

  ReactContextMenuEvent.useContextMenu(targetRef, {
    disabled,
    onContextMenu,
    preventDefault: preventContextMenu || false,
  });
}

export const WebPressability = {
  usePressability,
};
