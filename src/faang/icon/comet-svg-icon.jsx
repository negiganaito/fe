/* eslint-disable react/prop-types */
import * as stylex from '@stylexjs/stylex';
import React, { useId, isValidElement, cloneElement } from 'react';
import { jsx } from 'react/jsx-runtime';
import { BaseSVGIcon } from './base-svg-icon';
import { useCometIconColors } from './hooks';

const styles = stylex.create({
  color: (color) => ({
    color: color ?? 'initial',
  }),

  icon: {
    display: 'block',
    transitionDuration: 'var(--fds-fast)',
    transitionProperty: 'color,fill,stroke',
    transitionTimingFunction: 'var(--fds-soft)',
  },
  inline: {
    display: 'inline-block',
  },
  shadow: {
    filter: 'drop-shadow(0 2px 8px var(--shadow-1))',
    WebkitFilter: 'drop-shadow(0 2px 8px var(--shadow-1))',
  },
});

/**
 *
 * @param {import("./types").CometIconProps} props
 */
export const CometSvgIcon = (props) => {
  const iconId = useId();

  const colors = useCometIconColors();

  if (!props.viewBox) {
    const {
      alt,
      color,
      component,
      inline = false,
      shadow = false,
      size,
    } = props;

    return jsx(BaseSVGIcon, {
      alt,
      color: colors[color],
      icon: component,
      size,
      xstyle: [styles.icon, inline && styles.inline, shadow && styles.shadow],
    });
  } else {
    const {
      children,
      color,
      inline = false,
      shadow = false,
      size,
      ...rest
    } = props;

    const clonedElements = [];

    let fillValue;

    if (color && typeof color !== 'string' && isValidElement(color)) {
      clonedElements.push(
        cloneElement(color, {
          id: iconId,
          key: '1',
          suppressHydrationWarning: true,
        })
      );

      fillValue = 'url(#' + iconId + ')';
    }

    return (
      <svg
        {...rest}
        {...stylex.props([
          styles.icon,
          inline && styles.inline,
          shadow && styles.shadow,
          typeof color === 'string' && styles.color[color],
        ])}
        fill={fillValue ?? 'currentColor'}
        height={size}
        width={size}
        suppressHydrationWarning
      >
        {clonedElements.length > 0 && <defs>{clonedElements}</defs>}
        {children}
      </svg>
    );
  }
};
