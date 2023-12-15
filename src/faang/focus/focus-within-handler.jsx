/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';

import { FocusWithinHandlerNonStrictMode_DEPRECATED } from './focus-within-handler-non-strict-mode_DEPRECATED';
import { FocusWithinHandlerStrictMode } from './focus-within-handler-strict-mode';

const gkx3696 = false;

export const FocusWithinHandler = (props) => {
  if (gkx3696) {
    return <FocusWithinHandlerStrictMode {...props} />;
  } else {
    return <FocusWithinHandlerNonStrictMode_DEPRECATED {...props} />;
  }
};
