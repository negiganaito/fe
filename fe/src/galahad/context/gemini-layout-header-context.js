/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext, useMemo } from "react";

const initial = {
  hasCoverPhoto: false,
  hasHeaderExpanded: false,
  hasHeaderTabs: false,
  intersectionObserverRef: null,
};

const LayoutContext = React.createContext(initial);

const Provider = ({
  children,
  forceHeaderExpanded,
  hasHeaderCoverPhoto,
  hasHeaderTabs,
  leftNav,
  observerRef,
}) => {
  const value = useMemo(() => {
    return {
      hasCoverPhoto: hasHeaderCoverPhoto,
      hasHeaderExpanded: forceHeaderExpanded === true,
      hasHeaderTabs,
      intersectionObserverRef: observerRef,
    };
  }, [
    hasHeaderCoverPhoto,
    forceHeaderExpanded,
    hasHeaderTabs,
    leftNav,
    observerRef,
  ]);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

const useGeminiLayoutHeader = function () {
  return useContext(LayoutContext);
};

export const GeminiLayoutHeaderContext = { useGeminiLayoutHeader, Provider };
