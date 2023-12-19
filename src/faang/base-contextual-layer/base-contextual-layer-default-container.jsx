/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";

import { LegacyHidden } from "@/faang/common";
import { testID } from "@/faang/utils";

// type BaseContextualLayerDefaultContainerProps = {
//   className?: string
//   stopClickPropagation?: boolean
//   hidden?: boolean
//   children?: any
// }

export const BaseContextualLayerDefaultContainer = forwardRef((props, ref) => {
  return jsx(LegacyHidden, {
    children: props.children,
    htmlAttributes: {
      ...testID(props.testID),
      className: stylex(props.xstyle),
      onClick: props.stopClickPropagation
        ? (event) => event.stopPropagation()
        : undefined,
    },
    mode: props.hidden ? "hidden" : "visible",
    ref,
  });
});
