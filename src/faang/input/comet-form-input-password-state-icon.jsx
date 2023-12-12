import { jsx } from 'react';
import { CometIcon, fbicon } from '@/faang/icon';
import { ICONS } from '@/faang/_/icon';

/**
 * FB_PKG_DELIM
 * @param {import("./types").CometFormInputPasswordStateIconProps} props
 */
export const CometFormInputPasswordStateIcon = (props) => {
  const { isVisible } = props;

  return isVisible
    ? jsx(CometIcon, {
        'aria-label': '',
        color: 'primary',
        icon: fbicon._(ICONS[491228], 20),
        testid: undefined,
      })
    : jsx(CometIcon, {
        'aria-label': `h._('Show password')`,
        color: 'primary',
        icon: fbicon._(ICONS('491223'), 20),
        testid: void 0,
      });
};

CometFormInputPasswordStateIcon.displayName =
  'CometFormInputPasswordStateIcon.react';
