import React from 'react';

import { FocusWithinHandlerStrictMode } from './focus-within-handler-strict-mode';
import { FocusWithinHandlerNonStrictMode_DEPRECATED } from './focus-within-handler-non-strict-mode_DEPRECATED';

const gkx3696 = false;

export const FocusWithinHandler = (props) => {
  if (gkx3696) {
    return <FocusWithinHandlerStrictMode {...props} />;
  } else {
    return <FocusWithinHandlerNonStrictMode_DEPRECATED {...props} />;
  }
};
