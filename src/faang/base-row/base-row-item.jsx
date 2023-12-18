/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from '@stylexjs/stylex';
import React, { forwardRef, useContext } from 'react';

import { BaseRowContext } from '@/faang/context';

import { BaseView } from './base-view';


const styles = stylex.create({
  expanding: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  expandingWithWrap: {
    flexBasis: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
    minWidth: 0,
  },
  // eslint-disable-next-line camelcase
  item_DEPRECATED: {
    maxWidth: '100%',
    minWidth: 0,
  },
})

const columnStyles = stylex.create({
  1: {
    flexBasis: '100%',
  },
  10: {
    flexBasis: '10%',
  },
  2: {
    flexBasis: '50%',
  },
  3: {
    flexBasis: 'calc(100% / 3)',
  },
  4: {
    flexBasis: '25%',
  },
  5: {
    flexBasis: '20%',
  },
  6: {
    flexBasis: 'calc(100% / 6)',
  },
  7: {
    flexBasis: 'calc(100% / 7)',
  },
  8: {
    flexBasis: '12.5%',
  },
  9: {
    flexBasis: 'calc(100% / 9)',
  },
})

const verticalAlignStyles = stylex.create({
  bottom: {
    alignSelf: 'flex-end',
  },
  center: {
    alignSelf: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  top: {
    alignSelf: 'flex-start',
  },
})




/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseRowItemReactProps>
 */
export const BaseRowItem = forwardRef(
  (
    props,
    ref,
  ) => {

    const {
      verticalAlign,
      xstyle,
      expanding = false,
      useDeprecatedStyles = false,
      ...rest
    } = props

    const { columns, wrap } = useContext(BaseRowContext)


    return (
      <BaseView
        {...rest}
        ref={ref}
        xstyle={[
          useDeprecatedStyles ? styles.item_DEPRECATED : styles.item,
          expanding && styles.expanding,
          expanding && wrap !== 'none' && styles.expandingWithWrap,
          columns > 0 && columnStyles[columns],
          verticalAlign && verticalAlignStyles[verticalAlign],
          xstyle,
        ]}
      />
    )
  },
)

BaseRowItem.displayName = 'BaseRowItem.react'

