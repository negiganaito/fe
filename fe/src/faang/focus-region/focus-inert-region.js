/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  unstable_Scope as Unstable_Scope,
  useLayoutEffect,
  useRef,
} from "react";

import { setElementCanTab } from "./set-element-can-tab";

export function FocusInertRegion(props) {
  const { children, disabled = false, focusQuery } = props;

  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (focusQuery && scope) {
      const nodes = scope.DO_NOT_USE_queryAllNodes(focusQuery);
      if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          setElementCanTab.setElementCanTab(node, disabled);
        }
      }
    }
  }, [disabled, focusQuery]);

  // eslint-disable-next-line react/jsx-pascal-case
  return <Unstable_Scope ref={scopeRef}>{children}</Unstable_Scope>;
}
