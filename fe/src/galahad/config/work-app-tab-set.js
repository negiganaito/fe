/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import fbt from "fbt";

import { WorkGalahadAppTabChatBadgeRenderer } from "../badge/work-galahad-app-tab-chat-badge-renderer";
import { WorkGalahadAppTabKeyUpdatesBadgeRenderer } from "../badge/work-galahad-app-tab-key-updates-badge-renderer";
import { WorkGalahadAppTabNotificationsBadgeRenderer } from "../badge/work-galahad-app-tab-notifications-badge-renderer";
import { WorkGalahadHomeTabContainer_entrypoint } from "../entrypoint/work-galahad-home-tab-container.entrypoint";

export const WorkAppTabSet = [
  {
    id: "home",
    tabIconName: "HOME",
    href: "/",
    defaultEntityKey: "feed/newsfeed",
    title: fbt("Home", "Home"),
    trackingNodeType: 401,
    badgeRenderer: WorkGalahadAppTabKeyUpdatesBadgeRenderer,
    channelEntryPoint: WorkGalahadHomeTabContainer_entrypoint,
  },
  {
    id: "notifications",
    title: fbt("Notifications", "Notifications"),
    tabIconName: "NOTIFICATIONS",
    trackingNodeType: 402,
    href: "/notifications",
    defaultEntityKey: "notifications",
    channelEntryPoint: undefined,
    badgeRenderer: WorkGalahadAppTabNotificationsBadgeRenderer,
  },
  {
    id: "chats",
    title: fbt("Chat", "Chat"),
    tabIconName: "CHAT",
    trackingNodeType: 403,
    href: "/chats",
    defaultEntityKey: "chats",
    channelEntryPoint: undefined,
    badgeRenderer: WorkGalahadAppTabChatBadgeRenderer,
  },
  {
    id: "knowledge_library",
    title: "Knowledge Library",
    tabIconName: "KNOWLEDGE_LIBRARY",
    trackingNodeType: 478,
    href: "/work/knowledge",
    defaultEntityKey: "knowledge",
    channelEntryPoint: undefined,
  },
];
