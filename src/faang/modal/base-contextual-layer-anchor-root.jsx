/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import executionEnvironment from 'fbjs/lib/ExecutionEnvironment'
import React from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

import { BaseContextualLayerAnchorRootContext } from '@/faang/context'
import { BaseDOMContainer } from '@/faang/dialog'
import { useStable, useUnsafeRef_DEPRECATED } from '@/faang/hooks'

export const BaseContextualLayerAnchorRoot = ({ children }) => {
  const el = useStable(() => executionEnvironment.canUseDOM ? document.createElement('div') : null)

  const baseContextualLayerAnchorRootValue = useUnsafeRef_DEPRECATED(el)

  return jsxs(React.Fragment, {
    children: [
      jsx(BaseContextualLayerAnchorRootContext.Provider, {
        children,
        value: baseContextualLayerAnchorRootValue,
      }),
      jsx(BaseDOMContainer, {
        node: el,
      }),
    ],
  })
}
