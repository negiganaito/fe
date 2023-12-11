import React, { forwardRef } from 'react';

import { ErrorBoundary } from './error-boundary';
import { useHeroErrorMetadata } from './use-hero-error-metadata';

const cometErrorBoundary = (props, ref) => {
  const metadata = useHeroErrorMetadata();

  return (
    <ErrorBoundary
      augmentError={metadata}
      fallback={props.fallback}
      ref={ref}
    />
  );
};

export const CometErrorBoundary = forwardRef(cometErrorBoundary);
