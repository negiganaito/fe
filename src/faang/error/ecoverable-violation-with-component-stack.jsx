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
    context: { project: projectName, type: 'error' },
    fallback: () => (fallback != null ? fallback : null),
    children: jsx(parseError, {
      errorMessage,
    }),
  });
};
