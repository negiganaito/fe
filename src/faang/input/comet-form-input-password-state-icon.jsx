/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { fbt } from 'fbt';
import { jsx } from 'react/jsx-runtime';

import { ICONS } from '@/faang/_/icon';
import { CometIcon, fbicon } from '@/faang/icon';

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
      icon: fbicon._(ICONS[491223], 20),
      testid: undefined,
    });
};

CometFormInputPasswordStateIcon.displayName =
  'CometFormInputPasswordStateIcon.react';
