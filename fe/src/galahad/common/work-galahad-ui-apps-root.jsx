/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { GeminiLayoutNonResponsivenessNavigationExternal } from "./gemini-layout-non-responsiveness-navigation-external";

export const WorkGalahadUIAppsRoot = ({ children, onMouseEnter }) => {
  return (
    <GeminiLayoutNonResponsivenessNavigationExternal.GeminiNavigationNavArea
      onMouseEnter={onMouseEnter}
    >
      {children}
    </GeminiLayoutNonResponsivenessNavigationExternal.GeminiNavigationNavArea>
  );
};
