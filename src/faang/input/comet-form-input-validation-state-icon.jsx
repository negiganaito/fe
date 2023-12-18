/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { jsx } from 'react/jsx-runtime';

import { ICONS } from '@/faang/_/icon';
import { CometIcon, fbicon } from '@/faang/icon';
import { CometProgressRingIndeterminate } from '@/faang/progress-ring';

export const CometFormInputValidationStateIcon = {
  CORRECT: jsx(CometIcon, {
    color: 'positive',
    icon: fbicon._(ICONS[498146], 20),
    testid: undefined,
  }),
  ERROR: jsx(CometIcon, {
    color: 'negative',
    icon: fbicon._(ICONS[502062], 20),
    testid: undefined,
  }),
  LOADING: jsx(CometProgressRingIndeterminate, {
    color: 'disabled',
    size: 20,
  }),
  WARN: jsx(CometIcon, {
    color: 'warning',
    icon: fbicon._(ICONS[502062], 20),
    testid: undefined,
  }),
};
