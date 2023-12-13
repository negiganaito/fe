/* eslint-disable react/prop-types */
import React from 'react';
import { CometErrorBoundary } from './comet-error-boundary';
import { err } from './err';

function ThrowErr(props) {
  const { errorMessage } = props;
  throw err(errorMessage);
}

export const RecoverableViolationWithComponentStackReact = (props) => {
  const { errorMessage, fallback, projectName } = props;

  return (
    <CometErrorBoundary
      context={{ project: projectName, type: 'error' }}
      fallback={() => fallback ?? null}
      // eslint-disable-next-line react/no-children-prop
      children={<ThrowErr errorMessage={errorMessage} />}
    />
  );
};

RecoverableViolationWithComponentStackReact.displayName = `RecoverableViolationWithComponentStack.react`;
