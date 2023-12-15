/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { jsx } from 'react/jsx-runtime';

import { CometErrorBoundary } from './comet-error-boundary';

function parseError(errorMessage) {
  throw new Error(errorMessage);
}

/**
 *
 * @param {import("./types").RecoverableViolationWithComponentStackReactProps} props
 */
export const RecoverableViolationWithComponentStack = (props) => {
  const { errorMessage, fallback, projectName } = props;

  return jsx(CometErrorBoundary, {
    children: jsx(parseError, {
      errorMessage,
    }),
    context: { project: projectName, type: 'error' },
    fallback: () => (fallback != null ? fallback : null),
  });
};
