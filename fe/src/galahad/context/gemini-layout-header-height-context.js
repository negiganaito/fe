/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext, useMemo, useState } from "react";

const initial = {
  height: 0,
  setHeight: function () {},
};

const Context = React.createContext(initial);

function Provider({ children }) {
  const [height, setHeight] = useState();

  const value = useMemo(() => {
    return {
      height: height,
      setHeight: setHeight,
    };
  }, [height]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useGeminiLayoutHeaderHeight = () => {
  return useContext(Context);
};

export const GeminiLayoutHeaderHeightContext = {
  Provider,
  useGeminiLayoutHeaderHeight,
};
