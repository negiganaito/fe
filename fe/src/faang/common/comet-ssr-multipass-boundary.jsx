/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext } from "react";
// @ts-ignore
import { jsx } from "react/jsx-runtime";

import { CometBackupPlaceholder, CometPlaceholder } from "../comet-placeholder";
import { FBLogger, unrecoverableViolation } from "../error";
import { executionEnvironment } from "../utils";

import { CometSSRMultipassBoundaryUtils } from "./comet-ssr-multipass-boundary-utils";

export function CometSSRMultipassBoundary(a) {
  let b = a.children;
  let d = a.fallback;
  d = d === void 0 ? null : d;
  let e = a.id;
  a = a.useCometPlaceholder;
  a = a === !0 ? CometPlaceholder : CometBackupPlaceholder;
  return jsx(p, {
    boundaryId: e,
    children: jsx(a, {
      fallback: jsx(n, {
        id: e,
        children: d,
      }),
      children: jsx(m, {
        id: e,
        children: jsx(React.Fragment, {
          children: b,
        }),
      }),
    }),
  });
}

function m(a) {
  // @ts-ignore
  // eslint-disable-next-line no-invalid-this
  let e = this;
  let f = a.children;
  a = a.id;
  if (executionEnvironment.canUseDOM) {
    return f;
  }
  if (!CometSSRMultipassBoundaryUtils.isEnabledBoundary(a)) {
    let g = CometSSRMultipassBoundaryUtils.tryGetBoundaryPromise(a);
    if (g) throw g;
    g = function () {};
    let j = new Promise((a) => {
      g = a.bind(e);
    });
    CometSSRMultipassBoundaryUtils.updateDisabledBoundariesMap(a, {
      promise: j,
      resolveFunc: g,
    });
    throw j;
  }
  return f;
}

function n(a) {
  let b = a.children;
  a = a.id;
  CometSSRMultipassBoundaryUtils.isEnabledBoundary(a) &&
    FBLogger("comet_ssr").mustfix("SSR boundary suspended unexpectedly: " + a);
  return b;
}

const o = createContext(undefined);

function p(a) {
  let b = a.boundaryId;
  a = a.children;
  let d = useContext(o);
  if (executionEnvironment.canUseDOM) {
    return a;
  }
  if (d && d !== "root")
    throw unrecoverableViolation(
      "Nested SSR boundaries are unsupported. " +
        ("Found boundary '" + b + "' nested underneath ") +
        ("boundary '" + d + "'."),
      "comet_ssr"
    );
  return jsx(o.Provider, {
    value: b,
    children: a,
  });
}
