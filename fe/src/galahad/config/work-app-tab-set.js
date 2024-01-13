/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import fbt from "fbt";

import { WorkGalahadAppTabKeyUpdatesBadgeRenderer } from "../badge/work-galahad-app-tab-key-updates-badge-renderer";
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
  {},
  {},
  {},
  {},
];
