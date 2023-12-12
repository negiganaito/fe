/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import * as stylex from '@stylexjs/stylex';

import { forwardRef } from 'react';

import { jsx } from 'react/jsx-runtime';

import { TintableIconSource } from './tintable-icon-source';
import { BaseImage_DEPRECATED } from '@/faang/base-image/base-image_DEPRECATED';

const imageStyles = stylex.create({
  image: {
    verticalAlign: '-0.25em',
  },
});

const filterStyles = stylex.create({
  accent: {
    filter: 'var(--filter-accent)',
    WebkitFilter: 'var(--filter-accent)',
  },
  blueLink: {
    filter: 'var(--filter-blue-link-icon)',
    WebkitFilter: 'var(--filter-blue-link-icon)',
  },
  disabled: {
    filter: 'var(--filter-disabled-icon)',
    WebkitFilter: 'var(--filter-disabled-icon)',
  },
  negative: {
    filter: 'var(--filter-negative)',
    WebkitFilter: 'var(--filter-negative)',
  },
  placeholder: {
    filter: 'var(--filter-placeholder-icon)',
    WebkitFilter: 'var(--filter-placeholder-icon)',
  },
  positive: {
    filter: 'var(--filter-positive)',
    WebkitFilter: 'var(--filter-positive)',
  },
  primary: {
    filter: 'var(--filter-primary-icon)',
    WebkitFilter: 'var(--filter-primary-icon)',
  },
  primaryAccent: {
    filter: 'var(--filter-primary-accent)',
    WebkitFilter: 'var(--filter-primary-accent)',
  },
  secondary: {
    filter: 'var(--filter-secondary-icon)',
    WebkitFilter: 'var(--filter-secondary-icon)',
  },
  warning: {
    filter: 'var(--filter-warning-icon)',
    WebkitFilter: 'var(--filter-warning-icon)',
  },
  white: {
    filter: 'var(--filter-always-white)',
    WebkitFilter: 'var(--filter-always-white)',
  },
});

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometTintedIconProps>
 */
export const CometTintedIcon = forwardRef((props, ref) => {
  const { alt = '', color = 'black', draggable, icon, testid, xstyle } = props;

  const tintableIconSource = icon instanceof TintableIconSource;

  return jsx(
    BaseImage_DEPRECATED,
    Object.assign(
      {},
      {
        ...stylex.props(
          imageStyles.image,
          tintableIconSource && color !== 'black' && filterStyles[color],
          xstyle
        ),
      },
      {
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
      }
    )
  );
});

CometTintedIcon.displayName = 'CometTintedIcon.react';
