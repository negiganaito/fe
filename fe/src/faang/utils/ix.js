/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { invariant } from "./invariant";

// BUG: missing loggingID
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
    loggingID: "484757",
  },

  659288: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -767px",
    sz: "auto",
    loggingID: "659288",
  },

  621399: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -515px",
    sz: "auto",
    loggingID: "621399",
  },
  545517: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -536px",
    sz: "auto",
    loggingID: "545517",
  },
  492521: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 -50px",
    sz: "auto",
    loggingID: "492521",
  },
  492575: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 -75px",
    sz: "auto",
    loggingID: "492575",
  },
  492518: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -452px",
    sz: "auto",
    loggingID: "492518",
  },

  492572: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -473px",
    sz: "auto",
    loggingID: "492572",
  },

  505565: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -494px",
    sz: "auto",
    loggingID: "505565",
  },

  492454: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 20,
    h: 20,
    p: "0 -431px",
    sz: "auto",
    loggingID: "492454",
  },

  484391: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 -125px",
    sz: "auto",
    loggingID: "484391",
  },
  478237: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 16,
    h: 16,
    p: "0 -877px",
    sz: "auto",
    loggingID: "478237",
  },
  512665: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 24,
    h: 24,
    p: "0 0",
    sz: "auto",
    loggingID: "512665",
  },
  481882: {
    sprited: 2,
    spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    _spi: "/faang/assets/icon-list/SuNB9PFjk8q.png",
    w: 16,
    h: 16,
    p: "0 -1081px",
    sz: "auto",
    loggingID: "481882",
  },
  477831: {
    sprited: 2,
    spi: "/faang/assets/icon-list/fb.com/Go1VdUpKHBL.png",
    _spi: "/faang/assets/icon-list/fb.com/Go1VdUpKHBL.png",
    w: 20,
    h: 20,
    p: "0 -235px",
    sz: "auto",
    loggingID: "477831",
  },
  //
  498146: {
    _spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    h: 20,
    p: "0 -297px",
    spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    sprited: 2,
    sz: "auto",
    w: 20,
    loggingID: "498146",
  },
  1739808: {
    _spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    h: 8,
    p: "-13px -1104px",
    spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    sprited: 2,
    sz: "auto",
    w: 8,
    loggingID: "1739808",
  },
  502062: {
    _spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    h: 20,
    p: "0 -276px",
    spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    sprited: 2,
    sz: "auto",
    w: 20,
    loggingID: "502062",
  },
  701592: {
    _spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    h: 8,
    p: "-13px -1095px",
    spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    sprited: 2,
    sz: "auto",
    w: 8,
    loggingID: "701592",
  },
  702721: {
    _spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    h: 8,
    p: "-13px -1122px",
    spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    sprited: 2,
    sz: "auto",
    w: 8,
    loggingID: "702721",
  },
  897949: {
    _spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    h: 8,
    p: "-13px -1113px",
    spi: "/faang/assets/icon-list/XvqMI3OqoSa.png",
    sprited: 2,
    sz: "auto",
    w: 8,
    loggingID: "897949",
  },
  // comet-checkbox
  492790: {
    sprited: 2,
    spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    _spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    w: 16,
    h: 16,
    p: "0 -121px",
    sz: "auto",
    loggingID: "492790",
  },

  531032: {
    sprited: 2,
    spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    _spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    w: 24,
    h: 24,
    p: "0 0",
    sz: "auto",
    loggingID: "531032",
  },

  659287: {
    sprited: 2,
    spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    _spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    w: 16,
    h: 16,
    p: "0 -189px",
    sz: "auto",
    loggingID: "659287",
  },

  659289: {
    sprited: 2,
    spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    _spi: "/faang/assets/icon-list/fb.com/obqapSu-Iri.png",
    w: 24,
    h: 24,
    p: "0 -75px",
    sz: "auto",
    loggingID: "659289",
  },
  // date
  477912: {
    sprited: 2,
    spi: "/faang/assets/icon-list/q8oTSVjn9-V.png",
    _spi: "/faang/assets/icon-list/q8oTSVjn9-V.png",
    w: 16,
    h: 16,
    p: "0 -1090px",
    sz: "auto",
    loggingID: "477912",
  },

  477899: {
    sprited: 2,
    spi: "/faang/assets/icon-list/q8oTSVjn9-V.png",
    _spi: "/faang/assets/icon-list/q8oTSVjn9-V.png",
    w: 16,
    h: 16,
    p: "0 -1073px",
    sz: "auto",
    loggingID: "477899",
  },

  481127: {
    sprited: 2,
    spi: "/faang/assets/icon-list/2PROy0nfR3V.png",
    _spi: "/faang/assets/icon-list/2PROy0nfR3V.png",
    w: 20,
    h: 20,
    p: "0 -83px",
    sz: "auto",
    loggingID: "481127",
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
