/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'

// type BaseButtonPopoverContextProps = {
//   top: number
//   right: number
//   bottom: number
//   left: number
// }

const initial = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

export const BaseViewportMarginsContext =
  createContext(initial)
