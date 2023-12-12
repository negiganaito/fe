/* eslint-disable react/prop-types */
import * as stylex from '@stylexjs/stylex';

import React, { useState } from 'react';
import { BaseFocusRing } from '../focus/base-focus-ring';
import { CometVisualCompletionAttributes } from '../common/comet-visual-completion-attributes';
import { CometCompositeItemFocusIndicator } from './comet-composite-item-focus-indicator';

const styles = stylex.create({
  circle: {
    borderRadius: '50%',
  },
  defaultHoveredStyle: {
    backgroundColor: 'var(--hover-overlay)',
  },
  defaultPressedStyle: {
    backgroundColor: 'var(--press-overlay)',
  },
  overlay: {
    borderRadius: 'inherit',
    bottom: '0',
    right: '0',
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    left: '0',
    top: '0',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
  },
  overlayVisible: {
    opacity: '1',
    transitionDuration: '0s',
  },
});

/**
 *
 * @param {import("./types").CometPressableOverlayProps} props
 * @returns
 */
export const CometPressableOverlay = (props) => {
  const {
    focusVisible = false,
    hovered = false,
    pressed = false,
    focusRingPosition = 'default',
    hoveredStyle = styles.defaultHoveredStyle,
    focusVisibleStyle = hoveredStyle,
    offset,
    pressedStyle = styles.defaultPressedStyle,
    radius,
    showFocusRing = false,
    showGridSignifiers = false,
  } = props;

  const [state, setState] = useState();

  if (pressed) {
    state !== 'pressed' && setState('pressed');
  } else {
    if (focusVisible) {
      state !== 'focused' && setState('focused');
    } else {
      hovered && state !== 'hovered' && setState('hovered');
    }
  }

  // pressed
  //   ? state !== 'pressed' && setState('pressed')
  //   : focusVisible
  //   ? state !== 'focused' && setState('focused')
  //   : hovered && state !== 'hovered' && setState('hovered');

  let bottom, left, right, top;

  if (offset) {
    if (typeof offset === 'number') {
      bottom = -offset;
      left = -offset;
      right = -offset;
      top = -offset;
    } else {
      bottom = -offset.bottom;
      left = -offset.left;
      right = -offset.right;
      top = -offset.top;
    }
  }

  // offset != null &&
  //   (typeof offset === 'number'
  //     ? ((bottom = -offset),
  //       (left = -offset),
  //       (right = -offset),
  //       (top = -offset))
  //     : ((bottom = -offset.bottom),
  //       (left = -offset.left),
  //       (right = -offset.right),
  //       (top = -offset.top)));

  return (
    <div
      className={stylex(
        styles.overlay,
        (pressed || focusVisible || hovered || showGridSignifiers) &&
          styles.overlayVisible,
        state === 'pressed' && pressedStyle,
        state === 'focus' && focusVisibleStyle,
        state === 'hovered' && hoveredStyle,
        state === 'focused' && showFocusRing
          ? focusRingPosition === 'default'
            ? BaseFocusRing.focusRingXStyle
            : BaseFocusRing.focusRingInsetXStyle
          : undefined,
        radius === '50%' && styles.circle
      )}
      {...CometVisualCompletionAttributes.IGNORE}
      style={
        state !== null
          ? {
              borderRadius: typeof radius === 'number' ? radius : undefined,
              bottom,
              left,
              right,
              top,
            }
          : undefined
      }
    >
      {/* TODO */}
      {/* CometCompositeItemFocusIndicator */}
      {showGridSignifiers ? <CometCompositeItemFocusIndicator /> : null}
    </div>
  );
};

CometPressableOverlay.displayName = 'CometPressableOverlay.react';
