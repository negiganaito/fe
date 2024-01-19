/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { ChannelGeminiNavFocusableGroup } from "@/galahad/focus/channel-gemini-nav-focusable-group";

import { WorkGalahadUIAppsLists } from "./work-galahad-ui-apps-lists";

export const WorkNavigationList = ({ children }) => {
  return (
    <ChannelGeminiNavFocusableGroup.ChannelGeminiNavFocusableGroup
      allowModifiers
      orientation="vertical"
      tabScopeQuery={
        ChannelGeminiNavFocusableGroup.WorkGalahadNavFocusableScopeQuery
      }
      wrap
    >
      <WorkGalahadUIAppsLists>{children}</WorkGalahadUIAppsLists>
    </ChannelGeminiNavFocusableGroup.ChannelGeminiNavFocusableGroup>
  );
};
