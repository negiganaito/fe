/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useState } from "react";
import shallowEqual from "fbjs/lib/shallowEqual";

const useFluxStore = (a, b, d) => {
  let e = b(a);
  let f = useState(e);
  let g = f[0];
  let h = f[1];
  // eslint-disable-next-line no-cond-assign
  let l = (f = d) ? f : shallowEqual;
  let m = useCallback(() => {
    let c = b(a);
    let d = l(g, c);
    if (d) return;
    h(c);
  }, [b, g, l, a]);

  useEffect(() => {
    let b = a.addListener(m);
    return function () {
      return b.remove();
    };
  }, [m, a]);

  d = l(g, e);
  d || h(b(a));

  return g;
};

export const FluxHooks_EXPERIMENTAL = {
  useFluxStore,
};
