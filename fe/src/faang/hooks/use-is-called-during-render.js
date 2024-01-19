/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useRef } from "react";

import { FBLogger } from "@/faang/error";

export function useIsCalledDuringRender() {
  // eslint-disable-next-line no-unused-vars
  const a = useRef(void 0);
  return useCallback(() => {
    FBLogger("comet_ui")
      .blameToPreviousFrame()
      .warn(
        "useIsCalledDuringRender should only be used for development purpose. It is implemented in a way that will not work correctly in production."
      );
    return !1;
  }, []);
}
