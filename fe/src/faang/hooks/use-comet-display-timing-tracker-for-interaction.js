/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useRef } from "react";
import performanceNow from "fbjs/lib/performanceNow";

import { InteractionTracingMetrics } from "../trace/interaction-tracing-metrics";

export function useCometDisplayTimingTrackerForInteraction(a, d, e) {
  d === void 0 && (d = !1);
  let f = useRef(null);
  return useCallback(
    (g) => {
      if (a && f.current !== g) {
        f.current = g;
        if (g) {
          let i = performanceNow();
          e
            ? InteractionTracingMetrics.addMountPoint(e, i, a)
            : InteractionTracingMetrics.currentInteractionLogger().forEach(
                (b) => {
                  return InteractionTracingMetrics.addMountPoint(
                    b.traceId,
                    i,
                    a
                  );
                }
              );
          // TODO
          // if (!d && b("cr:449")) {
          //   let j = b("cr:449").getCurrentVCTraces();
          //   j.forEach((a) => {
          //     a.interactionType !== "INTERACTION" && a.excludeElement(g);
          //   });
          // }
        }
      }
    },
    [e, d, a]
  );
}
