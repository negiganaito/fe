/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { CometCompositeStructureContext } from "@/faang/context";
import { CometFocusGroup } from "@/faang/focus";
import { focusScopeQueries } from "@/faang/focus-region";

export const BaseList = forwardRef((props, ref) => {
  const { children, keyNavOrientation, label, role, xstyle } = props;

  const _role = role ?? "list";

  const cometCompositeStructureContextValue = useMemo(() => {
    return {
      role: _role,
    };
  }, [_role]);

  return keyNavOrientation ? (
    <CometFocusGroup
      orientation={keyNavOrientation}
      role={role}
      tabScopeQuery={focusScopeQueries.tabbableScopeQuery}
      children={(clazz) => {
        return (
          <div
            className={stylex([clazz, xstyle])}
            ref={ref}
            role={role ?? undefined}
          >
            {children}
          </div>
        );
      }}
    />
  ) : (
    <div
      aria-label={label ?? undefined}
      className={stylex(xstyle)}
      ref={ref}
      role={_role}
    >
      <CometCompositeStructureContext.Provider
        value={cometCompositeStructureContextValue}
      >
        {children}
      </CometCompositeStructureContext.Provider>
    </div>
  );
});
