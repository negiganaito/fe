/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react';

/**
 * @type {import("react").Context<import("./types").BaseThemeConfigContextProps>}
 */
export const BaseThemeConfigContext = createContext({
  darkClassName: null,
  darkVariables: {},
  lightClassName: null,
  lightVariables: {},
});
