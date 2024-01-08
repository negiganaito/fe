/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Pads a number with leading zeros to ensure a minimum length.
 *
 * @param {number} numberToPad - The number to pad.
 * @param {number} minimumLength - The minimum length of the resulting string.
 * @returns {string} - The padded number as a string.
 */
export function padNumber(numberToPad, minimumLength) {
  const numberAsString = numberToPad.toString();
  return numberAsString.length >= minimumLength
    ? numberAsString
    : "0".repeat(minimumLength - numberAsString.length) + numberAsString;
}
