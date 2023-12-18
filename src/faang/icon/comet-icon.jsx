/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from '@stylexjs/stylex';
import { createElement, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';

import { BaseImage_DEPRECATED } from '@/faang/base-image/base-image_DEPRECATED';
import { CometPressable } from '@/faang/pressable/comet-pressable';

import { CometSvgIcon } from './comet-svg-icon';
import { CometTintedIcon } from './comet-tinted-icon';
import { FlightSerializableIcon } from './flight-serializable-icon';
import { IconSource } from './icon-source';
import { ImageIconSource } from './image-icon-source';
import { SVGICON } from './svg-icon';
import { TintableIconSource } from './tintable-icon-source';

const styles = stylex.create({
  button: {
    '::after': {
      borderRadius: '50%',
      bottom: '-8px',
      content: "''",
      left: '-8px',
      position: 'absolute',
      right: '-8px',
      top: '-8px',
      zIndex: 1,
    },
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 0,
    display: 'inline-flex',
    margin: '0',
    padding: '0',
    position: 'relative',
    verticalAlign: 'bottom',
  },
  image: {
    verticalAlign: '-0.25em',
  },
  imageContain: {
    objectFit: 'fill',
  },
  imageCover: {
    objectFit: 'cover',
  },
  pressed: {
    transform: 'scale(.96)',
  },
});

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometIconProps>
 */
export const CometIcon = forwardRef((props, ref) => {
  const {
    color = 'primary',
    icon,
    size = 8,
    alt = '',
    disabled = false,
    disableOverlay_DEPRECATED = false,
    focusable,
    hideHoverOverlay = false,
    linkProps,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    testid,
    testOnly_pressed = false,
    xstyle,
    ...rest
  } = props;

  const normalizeIcon = FlightSerializableIcon.parseFlightIcon(icon);
  const _testid = !onPress ? testid : undefined;
  const _color = disabled ? 'disabled' : color;
  const pressableComp = onPress || linkProps;
  const _alt = (!pressableComp && rest['aria-label']) || alt;
  const _ref = pressableComp ? undefined : ref;

  const Img =
    normalizeIcon instanceof TintableIconSource
      ? jsx(CometTintedIcon, {
        alt: _alt,
        color: getColor(_color),
        draggable: rest.draggable,
        icon: normalizeIcon,
        ref: _ref,
        testid: undefined,
        xstyle,
      })
      : normalizeIcon instanceof ImageIconSource
        ? jsx(BaseImage_DEPRECATED, {
          alt: _alt,
          className: stylex(
            styles.image,
            normalizeIcon.resizeStrategy === 'contain' && styles.imageContain,
            normalizeIcon.resizeStrategy === 'cover' && styles.imageCover,
            xstyle
          ),
          draggable: rest.draggable,
          src: normalizeIcon.src,
          style: {
            height: normalizeIcon.height,
            width: normalizeIcon.width,
          },
          testid: undefined,
        })
        : normalizeIcon instanceof IconSource
          ? jsx(BaseImage_DEPRECATED, {
            alt: _alt,
            className: stylex(styles.image, xstyle),
            draggable: rest.draggable,
            height: normalizeIcon.size,
            ref: _ref,
            src: normalizeIcon.src,
            width: normalizeIcon.size,
          })
          : normalizeIcon instanceof SVGICON.LegacySVGIcon
            ? createElement(normalizeIcon.component, {
              alt: _alt,
              color: _color,
              'data-testid': _testid,
              size,
            })
            : normalizeIcon instanceof SVGICON.SVGIcon
              ? jsx(CometSvgIcon, {
                alt: _alt,
                color: _color,
                component: normalizeIcon.component,
                'data-testid': undefined,
                size,
              })
              : jsx(CometSvgIcon, {
                alt: _alt,
                color: _color,
                component: normalizeIcon.component ?? icon,
                'data-testid': void 0,
                size,
              });

  return pressableComp
    ? jsx(
      CometPressable,
      Object.assign({}, rest, {
        children: Img,
        disabled,
        focusable,
        hideHoverOverlay,
        linkProps,
        onHoverIn,
        onHoverOut,
        onPress,
        onPressIn,
        onPressOut,
        overlayDisabled: disableOverlay_DEPRECATED,
        overlayOffset: 8,
        overlayRadius: '50%',
        ref,
        testOnly_pressed,
        testid: void 0,
        xstyle: ({ pressed }) => {
          return [styles.button, pressed && styles.pressed];
        },
      })
    )
    : Img;
});

CometIcon.displayName = 'CometIcon.react';

function getColor(color) {
  switch (color) {
    case 'positive':
      return 'positive';
    case 'negative':
      return 'negative';
    case 'disabled':
      return 'disabled';
    case 'highlight':
      return 'accent';
    case 'secondary':
      return 'secondary';
    case 'tertiary':
      return 'placeholder';
    case 'white':
      return 'white';
    case 'primary':
      return 'primary';
    case 'warning':
      return 'warning';
    case 'blueLink':
      return 'blueLink';
    case 'primaryAccent':
      return 'primaryAccent';
    default:
      return 'black';
  }
}
