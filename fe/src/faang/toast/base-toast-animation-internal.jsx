/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useEffect, useState } from "react";
import stylex from "@stylexjs/stylex";

import {
  useFadeEffect,
  useMergeRefs_Legacy,
  useToasterStateManager,
  useVisibilityObserver,
} from "../hooks";

export const styles = stylex.create({
  mount: {
    opacity: "1",
    transform: "scale(1)",
    transitionDuration: "var(--fds-duration-short-in)",
    transitionTimingFunction: "var(--fds-animation-enter-exit-in)",
  },
  root: {
    opacity: "0",
    transform: "scale(.8) translateY(300px)",
    transitionDuration: "var(--fds-duration-short-out)",
    transitionProperty: "transform,opacity",
    transitionTimingFunction: "var(--fds-animation-enter-exit-out)",
  },
});

const basePosition = 100;

export function BaseToastAnimationInternal({
  children,
  expired = false,
  id,
  position,
  xstyle,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toasterStateManager = useToasterStateManager();

  const toastElement = React.Children.only(children);

  const onBlur = useCallback(() => {
    toasterStateManager.resetTimer(id);
  }, [id, toasterStateManager]);

  const onFocus = useCallback(() => {
    toasterStateManager.stopTimer(id);
  }, [id, toasterStateManager]);

  const onVisible = useCallback(() => {
    toasterStateManager.shown(id);
  }, [id, toasterStateManager]);

  const onHidden = useCallback(() => {
    toasterStateManager.hidden(id);
  }, [id, toasterStateManager]);

  const handleActionPress = useCallback(
    (event) => {
      toastElement.props.onActionPress &&
        toastElement.props.onActionPress(event);
      event.defaultPrevented || toasterStateManager.expire(id);
    },
    [toastElement.props, id, toasterStateManager]
  );

  const observerRef = useVisibilityObserver({
    onHidden: onHidden,
    onVisible: onVisible,
    options: {
      activityMonitorOverride: null,
    },
  });

  // isTransitioning, shouldBeVisible, fadeRef
  const [isTransitioning, shouldBeVisible, fadeRef] = useFadeEffect(!expired);

  const combinedRef = useMergeRefs_Legacy(fadeRef, observerRef);

  useEffect(() => {
    shouldBeVisible === true && setIsVisible(true);
  }, [shouldBeVisible]);

  return isTransitioning ? (
    <li
      className={stylex(styles.root, shouldBeVisible && styles.mount, xstyle)}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      ref={combinedRef}
      style={{
        bottom: basePosition * position,
      }}
    >
      {isVisible &&
        React.cloneElement(toastElement, {
          onActionPress: handleActionPress,
        })}
    </li>
  ) : null;
}
