/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useLayoutEffect, useRef } from "react";

export function useIsMountedRef() {
  let mount = useRef(false);

  useLayoutEffect(() => {
    mount.current = true;
    return function () {
      mount.current = false;
    };
  }, []);

  return mount;
}
