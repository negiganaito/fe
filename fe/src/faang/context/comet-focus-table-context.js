/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

/**
 * @typedef CometFocusTableContextProps
 * @property {any} FocusCell
 * @property {any} FocusRow
 * @property {any} FocusTable
 */

/**
 * @type {import("react").Context<CometFocusTableContextProps>}
 */
export const CometFocusTableContext = React.createContext({
  FocusCell: null,
  FocusRow: null,
  FocusTable: null,
});
