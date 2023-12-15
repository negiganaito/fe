/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'

// type HiddenSubtreeContextProps = {
//   backgrounded: boolean
//   hidden: boolean
//   hiddenOrBackgrounded: boolean
//   hiddenOrBackgrounded_FIXME: boolean
// }

export const HiddenSubtreeContext = createContext({
  backgrounded: !1,
  hidden: !1,
  hiddenOrBackgrounded: !1,
  // eslint-disable-next-line camelcase
  hiddenOrBackgrounded_FIXME: !1,
})
