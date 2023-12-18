/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';

import { LegacyHidden } from '@/faang/common'

import { testID } from '../utils';

const styles = stylex.create({
  hidden: {
    display: 'none',
  },

  root: {
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 0,
  },
})

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseViewReactProps>
 */
export const BaseView = forwardRef((props, ref) => {

  // eslint-disable-next-line no-unused-vars
  const { children, hidden, className, suppressHydrationWarning, xstyle, testid, ...rest } = props

  const isHidden = hidden === true


  return (
    <LegacyHidden
      {...testID(testid)}
      htmlAttributes={{
        className: stylex.props(
          styles.root,
          xstyle,
          isHidden && styles.hidden,
        ).className,
        ...rest,
      }}
      mode={isHidden ? 'hidden' : 'visible'}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children}
    </LegacyHidden>
  )
})

BaseView.displayName = 'BaseView.react'

