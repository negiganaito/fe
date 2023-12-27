/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function areKeyCombinationsEqual(combinationA, combinationB) {
  return !combinationA || !combinationB
    ? combinationA === combinationB
    : combinationA.key !== "" &&
        combinationB.key !== "" &&
        combinationA.key === combinationB.key &&
        (combinationA.alt === true) === (combinationB.alt === true) &&
        (combinationA.command === true) === (combinationB.command === true) &&
        (combinationA.shift === true) === (combinationB.shift === true);
}
