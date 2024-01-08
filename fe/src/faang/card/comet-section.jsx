/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

export const CometSection = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { children, className, name, role, testid } = props;

  return (
    <div
      aria-label={name}
      className={className}
      data-testid={undefined}
      ref={ref}
      role={role}
    >
      {children}
    </div>
  );
});
