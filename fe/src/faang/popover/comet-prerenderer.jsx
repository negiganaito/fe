/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import HiddenSubtreeContextProvider from "./hidden-subtree-context-provider";

// type CometPrerendererProps = {
//   children?: any
//   prerenderingProps?: any
// }

export function CometPrerenderer({ children, prerenderingProps = {} }) {
  const { isVisible = true, shouldPrerender = false } = prerenderingProps;

  return isVisible || shouldPrerender ? (
    <HiddenSubtreeContextProvider isHidden={!isVisible && shouldPrerender}>
      {children({
        hidden: !isVisible && shouldPrerender,
      })}
    </HiddenSubtreeContextProvider>
  ) : null;
}
