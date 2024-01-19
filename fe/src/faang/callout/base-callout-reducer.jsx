/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { unrecoverableViolation } from "@/faang/error";

export function BaseCalloutReducer(a, b) {
  switch (b.type) {
    case "addCallout":
      return !a.calloutID ? { ...a, ...b.payload } : a;
    case "removeCallout":
      if (a.calloutID && a.calloutID === b.payload) {
        let d = a.anchorRootRefContext;
        let e = a.animationContext;
        let f = a.contextualLayerProps;
        let g = a.scrollableAreaContext;
        return {
          anchorRootRefContext: d,
          animationContext: e,
          contextualLayerProps: f,
          scrollableAreaContext: g,
        };
      }
      return a;
    default:
      throw unrecoverableViolation(
        b.type + " is not a supported action type",
        "comet_ui"
      );
  }
}
