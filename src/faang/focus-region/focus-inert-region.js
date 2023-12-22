/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { unstable_Scope, useLayoutEffect, useRef } from "react";
import { jsx } from "react/jsx-runtime";

import { setElementCanTab } from "./set-element-can-tab";

export function FocusInertRegion(props) {
  const { children, disabled = false, focusQuery } = props;
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (focusQuery && scope) {
      const nodes = scope.DO_NOT_USE_queryAllNodes(focusQuery);
      if (nodes !== null) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          setElementCanTab.setElementCanTab(node, disabled);
        }
      }
    }
  }, [disabled, focusQuery]);

  return jsx(unstable_Scope, {
    ref: scopeRef,
    children,
  });
}
