/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";

import { BaseHeadingContext } from "./base-heading-context";

export function BaseHeadingContextWrapper({ children }) {
  const value = useContext(BaseHeadingContext);

  return (
    <BaseHeadingContext.Provider value={value + 1}>
      {children}
    </BaseHeadingContext.Provider>
  );
}
