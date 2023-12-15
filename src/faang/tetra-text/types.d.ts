/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */


export type TetraTextProps = {
  align?: 'center' | 'end' | 'start' | 'auto'
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
  dir?: 'ltr' | 'rtl' | 'auto'
  id?: string
  isPrimaryHeading?: boolean
  isSemanticHeading?: boolean
  numberOfLines?: number
  preserveNewLines?: boolean
  suppressHydrationWarning?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  truncationTooltip?: any
  type?: string
  hyphens?: string
}
