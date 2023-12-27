/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

/**
 * @typedef {Object} CometCompositeStructureContextProps
 * @property {boolean} horizontal - Indicates if the composite structure is horizontal.
 * @property {boolean} vertical - Indicates if the composite structure is vertical.
 * @property {string|undefined} role - The role of the composite structure (optional).
 */

/**
 * @type {import("react").Context<CometCompositeStructureContextProps>}
 */
export const CometCompositeStructureContext = createContext({
  horizontal: false,
  vertical: false,
});
