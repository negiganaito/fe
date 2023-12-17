/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'

/**
 * @typedef {Object} HiddenSubtreeContextProps
 * @property {boolean} backgrounded - Indicates if the subtree is backgrounded.
 * @property {boolean} hidden - Indicates if the subtree is hidden.
 * @property {boolean} hiddenOrBackgrounded - Indicates if the subtree is hidden or backgrounded.
 * @property {boolean} hiddenOrBackgrounded_FIXME - Indicates if the subtree is hidden or backgrounded (FIXME).
 */


/**
* @type {import("react").Context<HiddenSubtreeContextProps>}
*/
export const HiddenSubtreeContext = createContext({
  backgrounded: false,
  hidden: false,
  hiddenOrBackgrounded: false,
  // eslint-disable-next-line camelcase
  hiddenOrBackgrounded_FIXME: false,
})
