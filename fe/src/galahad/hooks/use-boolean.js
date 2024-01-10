/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useState } from "react";

export function useBoolean(a) {
  a = useState(a);
  let b = a[0];
  let c = a[1];
  return {
    value: b,
    set: c,
    toggle: useCallback(() => {
      return c((a) => {
        return !a;
      });
    }, []),
    setTrue: useCallback(() => {
      return c(!0);
    }, []),
    setFalse: useCallback(() => {
      return c(!1);
    }, []),
  };
}
