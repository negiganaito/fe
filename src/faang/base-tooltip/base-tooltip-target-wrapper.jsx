/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";

import { FocusWithinHandler } from "@/faang/focus";

const styles = stylex.create({
  inheritAll: {
    alignContent: "inherit",
    alignItems: "inherit",
    alignSelf: "inherit",
    display: "inherit",
    flexBasis: "inherit",
    flexDirection: "inherit",
    flexGrow: "inherit",
    flexShrink: "inherit",
    height: "inherit",
    justifyContent: "inherit",
    maxHeight: "inherit",
    maxWidth: "inherit",
    minHeight: "inherit",
    minWidth: "inherit",
    width: "inherit",
  },
  wrapperInline: {
    display: "inline-flex",
  },
});

export const BaseTooltipTargetWrapper = forwardRef(
  (
    { children, forceInlineDisplay, onHide, onShow, tooltipIdentifier },
    ref
  ) => {
    const [isFocus, onFocusChange] = useState(false);
    const [isFocusVisible, onFocusVisibleChange] = useState(false);

    const focus = isFocus && isFocusVisible;
    const focusRef = useRef(focus);

    useEffect(() => {
      if (focusRef.current !== focus) {
        if (focus) {
          onShow();
        } else {
          onHide();
        }
      }
      focusRef.current = focus;
    }, [onHide, onShow, focus]);

    const onKeyDown = useCallback(
      (event) => {
        const { key } = event;
        if (key === "Escape" && tooltipIdentifier) {
          onHide();
          event.stopPropagation();
        }
      },
      [onHide, tooltipIdentifier]
    );

    return (
      <span
        aria-describedby={tooltipIdentifier}
        className={stylex(
          styles.inheritAll,
          forceInlineDisplay && styles.wrapperInline
        )}
        data-testid={undefined}
        onKeyDown={onKeyDown}
        onPointerEnter={onShow}
        onPointerLeave={onHide}
        onPointerUp={onHide}
        ref={ref}
      >
        <FocusWithinHandler
          onFocusChange={onFocusChange}
          onFocusVisibleChange={onFocusVisibleChange}
        >
          {children}
        </FocusWithinHandler>
      </span>
    );
  }
);

BaseTooltipTargetWrapper.displayName = "BaseTooltipTargetWrapper.react";
