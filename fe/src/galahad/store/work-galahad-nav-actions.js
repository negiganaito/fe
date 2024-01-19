/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { setImmediateAcrossTransitions } from "@/faang/utils/set-immediate-across-transitions";

import { WorkGalahadDispatcher } from "./work-galahad-dispatcher";

const markPendingTransition = ({ appTabID, entityKey, uri }) => {
  //  typeof a === "string" && a.endsWith("?tab=security") && c("QPLUserFlow").start(c("qpl")._(54263819, "5173"));
  WorkGalahadDispatcher.dispatch({
    type: "nav/markPendingTransition",
    appTabID,
    entityKey,
    uri,
  });
};

const setActiveEntityKey = (entityKey) => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/setActiveEntityKey",
    entityKey,
  });
};

const selectAppTabID = (id) => {
  // a === "notifications" &&
  //   c("QPLUserFlow").start(c("qpl")._(57344005, "4959"), {
  //     instanceKey: d("QPLUtils").deriveInstanceKey(
  //       d(
  //         "WorkGalahadLocalUISettingsHelper"
  //       ).getNotificationsFilterFromStorage()
  //     ),
  //     annotations: {
  //       string: {
  //         reason: "TAB_CHANGED",
  //       },
  //     },
  //   });

  WorkGalahadDispatcher.dispatch({
    type: "nav/selectAppTabID",
    appTabID: id,
  });

  // d("WorkGalahadBeeperActions").clearBeepsForTabID(a)
};

const pushStackedChannel = (stackedChannelData) => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/pushStackedChannel",
    stackedChannelData,
  });
};

const replaceStackedChannel = (stackedChannelData) => {
  setImmediateAcrossTransitions(() => {
    WorkGalahadDispatcher.dispatch({
      type: "nav/replaceStackedChannel",
      stackedChannelData,
    });
  });
};

const dismissStackedChannel = () => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/dismissStackedChannel",
  });
};

const allowChannelAutoFocus = () => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/allowChannelAutoFocus",
  });
};

const dismissAllStackedChannels = () => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/dismissAllStackedChannels",
  });
};

const startLoading = (uri) => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/startLoading",
    uri,
  });
};

const stopLoading = () => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/stopLoading",
  });
};

const showPublicContentBanner = (html) => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/showPublicContentBanner",
    html,
  });
};

const hidePublicContentBanner = () => {
  WorkGalahadDispatcher.dispatch({
    type: "nav/hidePublicContentBanner",
  });
};

export const WorkGalahadNavActions = {
  markPendingTransition,
  setActiveEntityKey,
  selectAppTabID,
  pushStackedChannel,
  replaceStackedChannel,
  dismissStackedChannel,
  dismissAllStackedChannels,
  allowChannelAutoFocus,
  startLoading,
  stopLoading,
  showPublicContentBanner,
  hidePublicContentBanner,
};
