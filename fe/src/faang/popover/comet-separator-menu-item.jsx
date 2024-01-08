/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext } from "react";
import stylex from "@stylexjs/stylex";

import { CometMenuItemBaseRoleContext } from "@/faang/context";
// type CometSeparatorMenuItemProps = {} & React.JSX.IntrinsicElements['div']

const styles = stylex.create({
  separator: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "var(--divider)",
    marginTop: "4px",
    marginRight: "16px",
    marginBottom: "4px",
    marginLeft: "16px",
  },
});

export const CometSeparatorMenuItem = forwardRef(({ xstyle, ...rest }, ref) => {
  const role = useContext(CometMenuItemBaseRoleContext);

  return (
    <div
      {...rest}
      className={stylex([styles.separator, xstyle])}
      ref={ref}
      role={role === "menuitem" ? "separator" : "presentation"}
    />
  );
});
