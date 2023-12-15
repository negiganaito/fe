/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'

// type BaseContextualLayerOrientationContextProps = {
//   align: 'end' | 'middle' | 'start' | 'stretch'
//   position: 'above' | 'below' | 'end' | 'start'
// }

// const initial: BaseContextualLayerOrientationContextProps = {
//   align: 'start',
//   position: 'below',
// }

export const BaseContextualLayerOrientationContext =
  createContext({
    align: 'start',
    position: 'below'
  })
