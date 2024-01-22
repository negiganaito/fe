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

import { WorkGalahadAppTabIDUtil } from "./galahad/config";
import { ChannelGeminiContentContext } from "./galahad/context/channel-gemini-content-context";
import { workGalahadDispatcher } from "./galahad/store/work-galahad-dispatcher";
import { WorkGalahadNavActions } from "./galahad/store/work-galahad-nav-actions";
import { workGalahadNavStore } from "./galahad/store/work-galahad-nav-store";
import { routeTree } from "./routeTree.gen";

// Create the router using your route tree
export const router = new Router({ routeTree });

const urlMapper = {
  "/": {
    isCometRootContainer: true,
    tabKey: "home",
    tracePolicy: "gemini.home",
    prefetchable: true,
    refreshBehavior: "none",
    rootView: {
      allResources: [],
      entryPoint: "HomeGeminiContent.entrypoint",
      props: {},
      resource: "HomeGeminiContent.react",
    },
    routePath: "/",
    url: "/",
    secondaryRootView: {
      allResources: [],
      entryPoint: "WorkGalahadHomeTabContainer.entrypoint",
      props: {},
      resource: "WorkGalahadHomeTabContainer.react",
    },
  },
  "/work/knowledge": {
    isCometRootContainer: true,
    tabKey: "knowledge_library",
    tracePolicy: "gemini.knowledge.home",
    prefetchable: true,
    refreshBehavior: "none",
    rootView: {
      allResources: [],
      entryPoint: "WorkKnowledgeGeminiHomeRoot.entrypoint",
      props: {},
      resource: "WorkKnowledgeGeminiHomeRoot.react",
    },
    routePath: "/work/knowledge/{?collection_id}/{?mode}/",
    url: "/work/knowledge",
    secondaryRootView: {
      allResources: [],
      entryPoint: "WorkGalahadKnowledgesStackedChannel.entrypoint",
      props: {},
      resource: "WorkKnowledgesStackedChannel.react",
    },
  },
  "/chat/*": {
    isCometRootContainer: true,
    tabKey: "chats",
    tracePolicy: "gemini.chat.linked",
    prefetchable: true,
    refreshBehavior: "none",
    rootView: {
      allResources: [],
      entryPoint: "ChatGeminiLinkedGroupTabRoot.entrypoint",
      props: {},
      resource: "ChatGeminiRoot.react",
    },
    routePath: "/chat/t/{?thread_key}/",
    url: "/work/knowledge",
    secondaryRootView: {
      allResources: [],
      entryPoint: "WorkGalahadChatTabContainer.entrypoint",
      props: {},
      resource: "WorkGalahadChatTabContainer.react",
    },
  },
};

router.load().then(() => {
  const stores = [
    // WorkGalahadChatChannelStore
    workGalahadNavStore,
    // WorkGalahadQuickChatStore
  ].filter(Boolean);

  workGalahadDispatcher.explicitlyRegisterStores(stores);
  // WorkGalahadBeeperDispatcher.explicitlyRegisterStores([WorkGalahadBeeperStore]);
  // WorkGalahadLocalUISettingsDispatcher.explicitlyRegisterStores([WorkGalahadLocalUISettingsStore]);

  const { pathname } = window.location;

  const entity = urlMapper[pathname];

  const key =
    entity.tabKey ?? WorkGalahadAppTabIDUtil.getProductSpecificHomeTabID();

  WorkGalahadNavActions.selectAppTabID(key);
  // d("LSPlatformClientStartLoadingEarly").start(
  //     d("LSPlatformWorkchatConfig").config
  //   );

  // c("promiseDone")(
  //   d("LSPlatformWorkchatConfig").config.getDb(),
  //   function (a) {
  //     c("ChatGeminiMessageDeliveryLoggerDeferred") &&
  //       c("ChatGeminiMessageDeliveryLoggerDeferred")(a);
  //   }
  // );

  // c("gkx")("1861546") || d("WorkGalahadStylexTheme").rootStyleSheet.inject();

  // const entryPoint = !entity.secondaryRootView
  //   ? undefined
  //   : entity.secondaryRootView.entryPoint;

  // a != null
  //   ? a.onReadyImmediately(function (a) {
  //       d("ChannelGeminiContentContext.react").init(e, a);
  //     })
  //   : d("ChannelGeminiContentContext.react").init(e);

  // if (entryPoint) {
  //   ChannelGeminiContentContext.init(key, entryPoint);
  // } else {
  //   ChannelGeminiContentContext.init(key);
  // }

  // ChannelGeminiContentContext.init(key);
});
