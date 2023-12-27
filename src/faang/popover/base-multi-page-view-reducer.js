/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { FBLogger } from "@/faang/error";

let h = 0;

function i() {
  return h++;
}

const initialState = [
  {
    key: i(),
    type: "initial_page",
  },
];

function reducer(a, b) {
  let d = a.filter((a) => {
    return a.type !== "pushed_page" || !a.removed;
  });
  switch (b.type) {
    case "push_page":
      // eslint-disable-next-line no-inner-declarations, no-var
      var e =
        b.pageKey !== null
          ? d.find((a) => {
              return a.pageKey === b.pageKey;
            })
          : null;
      if (e)
        throw FBLogger("comet_ui").mustfixThrow(
          "Tried to push page with duplicate key."
        );
      return d.concat([
        {
          component: b.component,
          direction: b.direction,
          key: i(),
          pageKey: b.pageKey,
          removed: !1,
          type: "pushed_page",
        },
      ]);
    case "clear_removed_pages":
      return d;
    case "pop_page":
      e = d.length - 1;
      e = d[e];
      if (e.type === "pushed_page") {
        let f = b.index;
        if (b.pageKey) {
          let g = d.findIndex((a) => {
            return a.pageKey === b.pageKey;
          });
          f = g > -1 ? g : f;
        }
        return [].concat(d.slice(0, f ? Math.max(f + 1, 1) : -1), [
          { ...e, removed: !0 },
        ]);
      }
  }
  return a;
}

export const BaseMultiPageViewReducer = {
  initialState,
  reducer,
};
