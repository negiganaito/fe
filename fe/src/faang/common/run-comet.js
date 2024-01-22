/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-redeclare */
/* eslint-disable no-sequences */

import emptyFunction from "fbjs/lib/emptyFunction";

import {
  FBLogger,
  recoverableViolation,
  unexpectedUseInComet,
} from "@/faang/error";
import { createCancelableFunction, executionEnvironment } from "@/faang/utils";

let i = {};
let j = !1;
let k = !1;
let l = {
  remove: emptyFunction,
};
function m(a, b) {
  !i.unload &&
    ((i.unload = []),
    (i.afterunload = []),
    executionEnvironment.canUseEventListeners &&
      window.addEventListener("unload", () => {
        p("unload"), p("afterunload");
      })),
    !i[a]
      ? (recoverableViolation(
          "EVENT_LISTENERS." + a + " wasn't initialized but should have been!",
          "comet_infra"
        ),
        (i[a] = [b]))
      : i[a].push(b);
}
function n(a) {
  a ||
    recoverableViolation(
      "Undefined event listener handler is not allowed",
      "comet_infra"
    );
  // eslint-disable-next-line no-return-assign, no-cond-assign
  return createCancelableFunction(a ?? emptyFunction);
}
function o(a) {
  return {
    remove: function () {
      a.cancel();
    },
  };
}
function p(a) {
  let b = i[a] || [];
  for (let d = 0; d < b.length; d++) {
    let e = b[d];
    try {
      e();
    } catch (b) {
      FBLogger("comet_infra")
        .catching(b)
        .mustfix("Hit an error while executing '" + a + "' event listeners.");
    }
  }
  i[a] = [];
}
function q(a) {
  if (j) {
    a();
    return o(n(emptyFunction));
  }
  a = n(a);
  !i.domcontentloaded
    ? ((i.domcontentloaded = [a]),
      executionEnvironment.canUseEventListeners &&
        window.addEventListener(
          "DOMContentLoaded",
          () => {
            p("domcontentloaded");
          },
          !0
        ))
    : i.domcontentloaded.push(a);
  return o(a);
}
function a(a) {
  a = n(a);
  m("afterunload", a);
  return o(a);
}
function b(a) {
  a = n(a);
  !i.load
    ? ((i.load = [a]),
      executionEnvironment.canUseEventListeners &&
        window.addEventListener("load", () => {
          p("domcontentloaded"), p("load");
        }))
    : i.load.push(a);
  k &&
    setTimeout(() => {
      p("domcontentloaded"), p("load");
    }, 0);
  return o(a);
}
function d(a) {
  a = n(a);
  m("unload", a);
  return o(a);
}
function e(a, b) {
  if (b !== !1) {
    b =
      "Run.onBeforeUnload was called with include_quickling_events as true or undefined, but this is not valid in Comet.";
    FBLogger("comet_infra").blameToPreviousFrame().mustfix(b);
  }
  b = n(a);
  !i.beforeunload &&
    ((i.beforeunload = []),
    executionEnvironment.canUseEventListeners &&
      window.addEventListener("beforeunload", (a) => {
        // eslint-disable-next-line no-var
        var b = i.beforeunload || [];
        for (
          // eslint-disable-next-line no-var, no-inner-declarations
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
            FBLogger("comet_infra")
              .catching(a)
              .mustfix(
                "Hit an error while executing onBeforeUnload event listeners."
              );
          }
          if (g !== void 0) {
            g && g.body && (g = g.body);
            a.preventDefault();
            a.returnValue = g;
            return g;
          }
        }
      }));
  i.beforeunload.push(b);
  return o(b);
}
let r = e;

function f(a) {
  unexpectedUseInComet("Run.onLeave");
  return l;
}

function s(a, b) {
  unexpectedUseInComet("Run.onCleanupOrLeave");
  return l;
}

function t(a) {
  unexpectedUseInComet("Run.removeHook");
}

function u() {
  document.readyState === "loading"
    ? q(() => {
        j = !0;
      })
    : (j = !0);
  if (document.readyState === "complete") k = !0;
  else {
    let a = window.onload;
    window.onload = function () {
      a && a(), (k = !0);
    };
  }
}
executionEnvironment.canUseDOM && u();

// eslint-disable-next-line no-func-assign
u = null;
let v = null;

export const RunComet = {
  onLoad: q,
  onAfterUnload: a,
  onAfterLoad: b,
  onUnload: d,
  onBeforeUnload: e,
  maybeOnBeforeUnload: r,
  onLeave: f,
  onCleanupOrLeave: s,
  __removeHook: t,
  __domContentCallback: u,
  __onloadCallback: v,
};
