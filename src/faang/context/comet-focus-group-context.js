/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

/**
 * @typedef CometFocusGroupContextProps
 * @property {*} FocusContainer
 * @property {*} FocusItem
 */

/**
 * @type {import("react").Context<CometFocusGroupContextProps>}
 */
export const CometFocusGroupContext = createContext({
  FocusContainer: null,
  FocusItem: null,
});
