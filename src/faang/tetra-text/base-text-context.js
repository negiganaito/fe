/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext, useMemo } from "react";

export const BaseTextContext = createContext(undefined);

export function BaseTextContextProvider({ nested, children }) {
  const value = useMemo(() => ({ nested }), [nested]);

  return (
    <BaseTextContext.Provider value={value}>
      {children}
    </BaseTextContext.Provider>
  );
}

export const useBaseTextContext = () => {
  const context = useContext(BaseTextContext);
  /*
   * if (context === undefined) {
   *   throw new Error("useBaseTextContext was used outside of its Provider");
   * }
   */
  return context;
};
