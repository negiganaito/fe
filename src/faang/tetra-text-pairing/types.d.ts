/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export type TetraTextPairingProps = {
  body?: any
  bodyColor?:
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryDeemphasizedButton'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnMedia'
  | 'tertiary'
  | 'white'
  bodyLineLimit?: number
  bodyRef?: any
  bodyTruncationTooltip?: any
  dir?: any

  headline?: any
  headlineAddOn?: any
  headlineColor?:
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryDeemphasizedButton'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnMedia'
  | 'tertiary'
  | 'white'
  headlineLineLimit?: number
  headlineRef?: any
  headlineTruncationTooltip?: any
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  level: number | string
  meta?: any
  metaColor?:
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryDeemphasizedButton'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnMedia'
  | 'tertiary'
  | 'white'
  metaLineLimit?: number
  metaLocation?: string
  metaRef?: any
  metaTestID?: string
  metaTruncationTooltip?: any
  reduceEmphasis?: boolean
  testid?: string
  textAlign?: 'auto' | 'start' | 'center' | 'end'
}


export type CometHeadlineWithAddOnProps = {
  addOn?: ReactNode
  children?: ReactNode
  color?:
  | 'blueLink'
  | 'disabled'
  | 'disabledButton'
  | 'highlight'
  | 'negative'
  | 'placeholder'
  | 'positive'
  | 'primary'
  | 'primaryButton'
  | 'primaryDeemphasizedButton'
  | 'primaryOnMedia'
  | 'secondary'
  | 'secondaryButton'
  | 'secondaryOnMedia'
  | 'tertiary'
  | 'white'
  headlineRef?: any
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  numberOfLines?: number
  type: TypeKeys
}
