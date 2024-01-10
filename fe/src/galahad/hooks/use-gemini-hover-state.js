/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback } from "react";

import { useBoolean } from "./use-boolean";

export function useGeminiHoverState(a, b) {
  let d = useBoolean(!1);
  let e = d.set;
  let f = d.setFalse;
  let g = d.setTrue;
  d = d.value;
  let h = useCallback(
    (b) => {
      // eslint-disable-next-line no-sequences
      g(), !a ? void 0 : a(b);
    },
    [g, a]
  );
  let j = useCallback(
    (a) => {
      // eslint-disable-next-line no-sequences
      f(), !b ? void 0 : b(a);
    },
    [f, b]
  );
  return [
    d,
    {
      onMouseEnter: h,
      onMouseLeave: j,
    },
    e,
  ];
}
