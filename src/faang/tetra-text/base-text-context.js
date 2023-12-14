import React, { createContext, useContext, useMemo } from 'react';

export const BaseTextContext = createContext(
  undefined,
);

export function BaseTextContextProvider({
  nested,
  children,
}) {
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
