/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

export function BasePopoverDownEdgeArrow({ children, ...props }) {
  return (
    <svg height={12} viewBox="0 0 21 12" width={21} {...props}>
      {children && <defs>{children}</defs>}
      <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z" />
    </svg>
  );
}

BasePopoverDownEdgeArrow._isSVG = true;
