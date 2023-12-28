/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useEffect, useRef } from "react";

export function usePrevious(val) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
}
