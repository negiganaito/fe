/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from 'react';

import { ErrorBoundary } from './error-boundary';
import { useHeroErrorMetadata } from './use-hero-error-metadata';

const cometErrorBoundary = (props, ref) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
