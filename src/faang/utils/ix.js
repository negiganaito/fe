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
  477820: {
    sprited: 2,
    spi: "/faang/assets/icon-list/Xtvez-N6Pda.png",
    _spi: "/faang/assets/icon-list/Xtvez-N6Pda.png",
    w: 20,
    h: 20,
    p: "0 -410px",
    sz: "auto",
    loggingID: "477820",
  },
  621400: {
    sprited: 2,
    spi: "/faang/assets/icon-list/t4RdauIjqvm.png",
    _spi: "/faang/assets/icon-list/t4RdauIjqvm.png",
    w: 24,
    h: 24,
    p: "0 -62px",
    sz: "auto",
    loggingID: "621400",
  },

  545519: {
    sprited: 2,
    spi: "/faang/assets/icon-list/t4RdauIjqvm.png",
    _spi: "/faang/assets/icon-list/t4RdauIjqvm.png",
    w: 24,
    h: 24,
    p: "0 -87px",
    sz: "auto",
    loggingID: "545519",
  },
  484757: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -368px",
    sz: "auto",
  },

  659288: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -767px",
    sz: "auto",
  },

  621399: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -515px",
    sz: "auto",
  },
  545517: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -536px",
    sz: "auto",
  },
  492521: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 -50px",
    sz: "auto",
  },
  492575: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 -75px",
    sz: "auto",
  },
  492518: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -452px",
    sz: "auto",
  },

  492572: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -473px",
    sz: "auto",
  },

  505565: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -494px",
    sz: "auto",
  },

  492454: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -431px",
    sz: "auto",
  },

  484391: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 -125px",
    sz: "auto",
  },
  478237: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 16,
    h: 16,
    p: "0 -877px",
    sz: "auto",
  },
  512665: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 0",
    sz: "auto",
  },
  481882: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 16,
    h: 16,
    p: "0 -1081px",
    sz: "auto",
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
