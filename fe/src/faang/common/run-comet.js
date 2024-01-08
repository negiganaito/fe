/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-redeclare */
/* eslint-disable no-sequences */

import emptyFunction from "fbjs/lib/emptyFunction";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import {
  FBLogger,
  recoverableViolation,
  unexpectedUseInComet,
} from "@/faang/error";
import { createCancelableFunction } from "@/faang/utils";

//

function l(a, b) {
  h.unload === null &&
    ((h.unload = []),
    (h.afterunload = []),
    ExecutionEnvironment.canUseEventListeners &&
      window.addEventListener("unload", () => {
        // eslint-disable-next-line no-sequences
        o("unload"), o("afterunload");
        // eslint-disable-next-line no-sequences
      })),
    h[a] === null
      ? (recoverableViolation(
          "EVENT_LISTENERS." + a + " wasn't initialized but should have been!",
          "comet_infra"
        ),
        (h[a] = [b]))
      : h[a].push(b);
}

function m(a) {
  a ||
    recoverableViolation(
      "Undefined event listener handler is not allowed",
      "comet_infra"
    );

  // eslint-disable-next-line no-self-assign, no-return-assign
  return createCancelableFunction((a = a) !== null ? a : emptyFunction);
}

function n(a) {
  return {
    remove: function () {
      a.cancel();
    },
  };
}

// eslint-disable-next-line no-var
var h = {};
let i = !1;
let j = !1;
let k = {
  remove: emptyFunction,
};

function o(a) {
  let b = h[a] || [];
  for (let d = 0; d < b.length; d++) {
    let e = b[d];
    try {
      e();
    } catch (b) {
      // c('FBLogger')('comet_infra')
      //   .catching(b)
      //   .mustfix("Hit an error while executing '" + a + "' event listeners.")
    }
  }
  h[a] = [];
}

function onLoad(a) {
  if (i) {
    a();
    return n(m(emptyFunction));
  }
  a = m(a);
  h.domcontentloaded === null
    ? ((h.domcontentloaded = [a]),
      ExecutionEnvironment.canUseEventListeners &&
        window.addEventListener(
          "DOMContentLoaded",
          () => {
            o("domcontentloaded");
          },
          !0
        ))
    : h.domcontentloaded.push(a);
  return n(a);
}

function onAfterLoad(a) {
  a = m(a);
  h.load === null
    ? ((h.load = [a]),
      ExecutionEnvironment.canUseEventListeners &&
        window.addEventListener("load", () => {
          o("domcontentloaded"), o("load");
        }))
    : h.load.push(a);
  j &&
    setTimeout(() => {
      o("domcontentloaded"), o("load");
    }, 0);
  return n(a);
}

function onAfterUnload(a) {
  a = m(a);
  l("afterunload", a);
  return n(a);
}

function onUnload(a) {
  a = m(a);
  l("unload", a);
  return n(a);
}

function onBeforeUnload(a, b) {
  if (b !== !1) {
    b =
      "Run.onBeforeUnload was called with include_quickling_events as true or undefined, but this is not valid in Comet.";
    FBLogger("comet_infra").blameToPreviousFrame().mustfix(b);
  }
  b = m(a);
  h.beforeunload === null &&
    ((h.beforeunload = []),
    ExecutionEnvironment.canUseEventListeners &&
      window.addEventListener("beforeunload", (a) => {
        // eslint-disable-next-line no-var
        var b = h.beforeunload || [];
        for (
          // eslint-disable-next-line no-inner-declarations, no-var
          var b = b,
            d = Array.isArray(b),
            e = 0,
            b = d
              ? b
              : b[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          // eslint-disable-next-line no-inner-declarations, no-var
          var f;
          if (d) {
            if (e >= b.length) break;
            f = b[e++];
          } else {
            e = b.next();
            if (e.done) break;
            f = e.value;
          }
          // eslint-disable-next-line no-self-assign
          f = f;
          let g = void 0;
          try {
            g = f();
          } catch (a) {
            // c('FBLogger')('comet_infra')
            //   .catching(a)
            //   .mustfix(
            //     'Hit an error while executing onBeforeUnload event listeners.',
            //   )
          }
          if (g !== void 0) {
            g !== null && g.body !== null && (g = g.body);
            a.preventDefault();
            a.returnValue = g;
            return g;
          }
        }
      }));
  h.beforeunload.push(b);
  return n(b);
}

function onLeave(a) {
  unexpectedUseInComet("Run.onLeave");
  return k;
}

function onCleanupOrLeave(a, b) {
  unexpectedUseInComet("Run.onCleanupOrLeave");
  return k;
}

const maybeOnBeforeUnload = onBeforeUnload;

function __removeHook(a) {
  unexpectedUseInComet("Run.removeHook");
}

// function __domContentCallback() {
//   document.readyState === 'loading'
//     ? onLoad(function () {
//         i = !0
//       })
//     : (i = !0)
//   if (document.readyState === 'complete') j = !0
//   else {
//     var a = window.onload
//     window.onload = function () {
//       a && a(), (j = !0)
//     }
//   }
// }

const __domContentCallback = null;
const __onloadCallback = null;

export const RunComet = {
  onLoad,
  onAfterUnload,
  onAfterLoad,
  onUnload,
  onBeforeUnload,
  maybeOnBeforeUnload,
  onLeave,
  onCleanupOrLeave,
  __removeHook,
  __domContentCallback,
  __onloadCallback,
};
