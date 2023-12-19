/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { unstable_LegacyHidden, useRef } from "react";
import { jsx } from "react/jsx-runtime";

export const LegacyHidden = (props, refFunc) => {
  const { children, htmlAttributes, mode, suppressHydrationWarning } = props;

  const visibilityRef = useRef(mode === "visible");

  if (mode === "visible" && !visibilityRef.current) {
    visibilityRef.current = true;
  }

  const _children = jsx(unstable_LegacyHidden, {
    children,
    mode: mode === "hidden" ? "unstable-defer-without-hiding" : mode,
  });

  return jsx("div", {
    ...htmlAttributes,
    children: _children,
    hidden: mode === "hidden" ? true : undefined,
    ref: refFunc,
    suppressHydrationWarning,
  });
};

LegacyHidden.displayName = "LegacyHidden";
