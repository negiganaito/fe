/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react';

/**
 * @typedef {Object} BaseButtonPopoverContextProps
 * @property {boolean} expanded - Indicates whether the popover is expanded or not.
 * @property {string} haspopup - A string indicating the presence of a popup related to the button.
 */

/**
 * @type {import("react").Context<BaseButtonPopoverContextProps | undefined>}
 */
export const BaseButtonPopoverContext = createContext(undefined);
