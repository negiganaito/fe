/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  // RootRoute, Route,
  Router,
} from "@tanstack/react-router";

import { WorkGalahadNavStore } from "./galahad/provider/work-galahad-nav-store";
import { workGalahadDispatcher } from "./galahad/store/work-galahad-dispatcher";
import { routeTree } from "./routeTree.gen";

// Create the router using your route tree
export const router = new Router({ routeTree });

router.load().then(() => {
  const stores = [
    // WorkGalahadChatChannelStore
    WorkGalahadNavStore,
    // WorkGalahadQuickChatStore
  ].filter(Boolean);

  workGalahadDispatcher.explicitlyRegisterStores();
  // WorkGalahadBeeperDispatcher.explicitlyRegisterStores([WorkGalahadBeeperStore]);
  // WorkGalahadLocalUISettingsDispatcher.explicitlyRegisterStores([WorkGalahadLocalUISettingsStore]);
});
