/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";

const Context = React.createContext(false);
Context.displayName = "GeminiLayoutHasFixedBannerContext";

const Provider = ({ children, hasFixedBanner }) => {
  return <Context.Provider value={hasFixedBanner}>{children}</Context.Provider>;
};

const useGeminiLayoutHasFixedBanner = () => {
  return useContext(Context);
};

export const GeminiLayoutHasFixedBannerContext = {
  Provider,
  useGeminiLayoutHasFixedBanner,
};
