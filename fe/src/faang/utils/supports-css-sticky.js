/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

let cssObject;

// Check if the browser supports the CSS property "position: sticky" or "-webkit-sticky"
export const supportsCSSSticky =
  (!(cssObject = window.CSS) // Check if window.CSS is null or undefined
    ? void 0 // If true, set isStickySupported to undefined
    : cssObject.supports) &&
  (cssObject.supports("position", "sticky") || // Check if "position: sticky" is supported
    cssObject.supports("position", "-webkit-sticky")); // Check if "position: -webkit-sticky" is supported
