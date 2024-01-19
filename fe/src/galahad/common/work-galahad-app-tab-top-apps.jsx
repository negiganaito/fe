/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import { ErrorBoundary } from "@/faang/error";

import { WorkAppTabSet } from "../config/work-app-tab-set";

import { WorkGalahadAppTabItem } from "./work-galahad-app-tab-item";

export const WorkGalahadAppTabTopApps = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <WorkGalahadAppTabTop />
    </ErrorBoundary>
  );
};

const WorkGalahadAppTabTop = () => {
  // useGeminiChatUnreadCount
  const chatUnread = 0;
  // WorkGalahadNotificationsBadge.useCount
  const notificationCount = 0;

  return WorkAppTabSet.map((tab, index) => {
    return (
      <WorkGalahadAppTabItem
        badgeCount={
          tab.id === "chats"
            ? chatUnread
            : tab.id === "notifications"
            ? notificationCount
            : 0
        }
        isFirst={index === 0}
        onHoverIn={emptyFunction}
        onPress={emptyFunction}
        tab={tab}
        key={tab.id}
      />
    );
  });
};

const Fallback = () => {
  return WorkAppTabSet.map((tab, index) => {
    return (
      <WorkGalahadAppTabItem
        badgeCount={0}
        isFirst={index === 0}
        onHoverIn={emptyFunction}
        onPress={emptyFunction}
        tab={tab}
        key={tab.id}
      />
    );
  });
};
