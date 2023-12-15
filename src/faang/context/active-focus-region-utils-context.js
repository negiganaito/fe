/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'

// type ActiveFocusRegion = {
//   lastFocused?: any
//   scope?: any
//   restorationFocusRegionItem?: any
//   triggeredFocusRegionItems?: any
// }

// type ActiveFocusRegionUtilsContextProps = {
//   getActiveFocusRegion: () => any
//   setActiveFocusRegion: (region: ActiveFocusRegion) => void
// }

export const ActiveFocusRegionUtilsContext = createContext(undefined)
