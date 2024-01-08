/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

export function BasePopoverDownInsetArrow({ children, ...props }) {
  return (
    <svg height={12} viewBox="0 0 25 12" width={25} {...props}>
      {children && <defs>{children}</defs>}
      <path d="M24.553.103c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V2.085C1.373 1.191.846.422.1.102h24.453z" />
    </svg>
  );
}

BasePopoverDownInsetArrow._isSVG = true;
