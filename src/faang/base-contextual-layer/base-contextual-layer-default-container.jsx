/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { LegacyHidden } from "@/faang/common";
import { testID } from "@/faang/utils";

// type BaseContextualLayerDefaultContainerProps = {
//   className?: string
//   stopClickPropagation?: boolean
//   hidden?: boolean
//   children?: any
// }

export const BaseContextualLayerDefaultContainer = forwardRef((props, ref) => {
  return (
    <LegacyHidden
      htmlAttributes={{
        ...testID(props.testID),
        className: stylex(props.xstyle),
        onClick: props.stopClickPropagation
          ? (event) => event.stopPropagation()
          : undefined,
      }}
      mode={props.hidden ? "hidden" : "visible"}
      ref={ref}
    >
      {props.children}
    </LegacyHidden>
  );

  // return jsx(LegacyHidden, {
  //   children: props.children,
  //   htmlAttributes: {
  //     ...testID(props.testID),
  //     className: stylex(props.xstyle),
  //     onClick: props.stopClickPropagation
  //       ? (event) => event.stopPropagation()
  //       : undefined,
  //   },
  //   mode: props.hidden ? "hidden" : "visible",
  //   ref,
  // });
});
