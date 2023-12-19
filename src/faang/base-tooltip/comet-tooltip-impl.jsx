/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';

import { CometPlaceholder } from '@/faang/comet-placeholder/comet-placeholder';

import { CometTooltipDeferredImpl } from './comet-tooltip-deferred-impl';

export function CometTooltipImpl(props) {
  return (
    <CometPlaceholder fallback={null}>
      <CometTooltipDeferredImpl {...props} />
    </CometPlaceholder>
  );
}
