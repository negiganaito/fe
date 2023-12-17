/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'


/**
 * @typedef BaseRowContextProps
 * @property {number} columns
 * @property {string} wrap
 */


/**
 * @type {import("react").Context<BaseRowContextProps>}
 */
export const BaseRowContext = createContext({
  columns: 1,
  wrap: 'none',
})
