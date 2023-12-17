/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react'

/**
 * @typedef {Object} BaseContextualLayerOrientationContextProps
 * @property {'end' | 'middle' | 'start' | 'stretch'} align - The alignment of the contextual layer.
 * @property {'above' | 'below' | 'end' | 'start'} position - The position of the contextual layer.
 */

/**
 * @type {BaseContextualLayerOrientationContextProps} InitialContextualLayerOrientation - Initial values for contextual layer orientation.
 */
const initial = {
  align: 'start',
  position: 'below',
};


/**
* @type {import("react").Context<BaseContextualLayerOrientationContextProps>}
*/
export const BaseContextualLayerOrientationContext = createContext(initial)
