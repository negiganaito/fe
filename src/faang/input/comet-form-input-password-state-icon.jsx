import { jsx } from 'react';

import { fbt } from 'fbt';

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
        'aria-label': fbt.c('Hide password'),
        color: 'primary',
        icon: fbicon._(ICONS[491228], 20),
        testid: undefined,
      })
    : jsx(CometIcon, {
        'aria-label': fbt.c('Show password'),
        color: 'primary',
        icon: fbicon._(ICONS('491223'), 20),
        testid: undefined,
      });
};

CometFormInputPasswordStateIcon.displayName =
  'CometFormInputPasswordStateIcon.react';
