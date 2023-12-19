/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { invariant } from "./invariant";

const entriesMap = {
  491223: {
    loggingID: "491223",
    spriteCssClass: "sx_22a739",
    spriteMapCssClass: "sp_oKdKOdjtJ90",
    sprited: 1,
  },
  491228: {
    loggingID: "491228",
    spriteCssClass: "sx_8a9c69",
    spriteMapCssClass: "sp_oKdKOdjtJ90",
    sprited: 1,
  },
};
const usedPathsSet = new Set();

export function ix(key) {
  const entry = entriesMap[key];
  !entry && invariant(0, 11798, key);
  return entry;
}

ix.add = function (entries, counters) {
  let hasDuplicates = false;
  // eslint-disable-next-line guard-for-in
  for (const key in entries) {
    counters && counters.entry++;
    if (!(key in entriesMap)) {
      entries[key].loggingID = key;
      entriesMap[key] = entries[key];
    } else {
      hasDuplicates && counters && counters.dup_entry++;
    }
  }
};

ix.getUsedPathsForReactFlight = function () {
  window.__flight_execution_mode_DO_NOT_USE === "flight" || invariant(0, 34547);
  return Array.from(usedPathsSet);
};

ix.getAllPaths = function () {
  const uniquePathsSet = new Set();
  Object.values(entriesMap).forEach((entry) => {
    if (entry && entry.sprited === 0) uniquePathsSet.add(entry.uri);
    else if (entry && entry.sprited === 1) uniquePathsSet.add(entry._spi);
    else if (entry && entry.sprited === 2) uniquePathsSet.add(entry.spi);
  });
  return uniquePathsSet;
};
