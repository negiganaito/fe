/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { BaseToasterStateManagerContext } from "../context";

import { BaseToasterStateManager } from "./base-toaster-state-manager";

const instance = BaseToasterStateManager.getInstance();

export function BaseToasterStateManagerProvider({ children }) {
  return (
    <BaseToasterStateManagerContext.Provider value={instance}>
      {children}
    </BaseToasterStateManagerContext.Provider>
  );
}
