/* eslint-disable react/display-name */
import stylex from '@stylexjs/stylex';

import { forwardRef, createElement } from 'react';

import { jsx } from 'react/jsx-runtime';
import { FlightSerializableIcon } from './flight-serializable-icon';
import { TintableIconSource } from './tintable-icon-source';
import { CometTintedIcon } from './comet-tinted-icon';
import { ImageIconSource } from './image-icon-source';
import { BaseImage_DEPRECATED } from '@/faang/base-image/base-image_DEPRECATED';
import { IconSource } from './icon-source';

import { SVGICON } from './svg-icon';
import { CometSvgIcon } from './comet-svg-icon';
import { CometPressable } from '@/faang/pressable/comet-pressable';

const styles = stylex.create({
  button: {
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 0,
    display: 'inline-flex',
    margin: '0',
    padding: '0',
    position: 'relative',
    verticalAlign: 'bottom',
    ':after': {
      borderRadius: '50%',
      bottom: '-8px',
      content: "''",
      right: '-8px',
      position: 'absolute',
      left: '-8px',
      top: '-8px',
      zIndex: 1,
    },
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
                size,
                'data-testid': void 0,
              });

  return pressableComp
    ? jsx(
      CometPressable,
      Object.assign({}, rest, {
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
        children: Img,
      })
    )
    : Img;
});

CometIcon.propTypes = 'CometIcon.react';

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
