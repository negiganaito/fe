/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { BaseContextualLayerAnchorRootContext } from "@/faang/context";
import { BaseDOMContainer } from "@/faang/dialog";
import { useStable, useUnsafeRef_DEPRECATED } from "@/faang/hooks";

export const BaseContextualLayerAnchorRoot = ({ children }) => {
  const el = useStable(() =>
    ExecutionEnvironment.canUseDOM ? document.createElement("div") : null
  );

  const baseContextualLayerAnchorRootValue = useUnsafeRef_DEPRECATED(el);

  return (
    <>
      <BaseContextualLayerAnchorRootContext.Provider
        value={baseContextualLayerAnchorRootValue}
      >
        {children}
      </BaseContextualLayerAnchorRootContext.Provider>
      <BaseDOMContainer node={el} />
    </>
  );

  // return jsxs(React.Fragment, {
  //   children: [
  //     jsx(BaseContextualLayerAnchorRootContext.Provider, {
  //       children,
  //       value: baseContextualLayerAnchorRootValue,
  //     }),
  //     jsx(BaseDOMContainer, {
  //       node: el,
  //     }),
  //   ],
  // });
};
