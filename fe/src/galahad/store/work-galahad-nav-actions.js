/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { setImmediateAcrossTransitions } from "@/faang/utils/set-immediate-across-transitions";

import { workGalahadDispatcher } from "./work-galahad-dispatcher";

const markPendingTransition = ({ appTabID, entityKey, uri }) => {
  //  typeof a === "string" && a.endsWith("?tab=security") && c("QPLUserFlow").start(c("qpl")._(54263819, "5173"));
  workGalahadDispatcher.dispatch({
    type: "nav/markPendingTransition",
    appTabID,
    entityKey,
    uri,
  });
};

const setActiveEntityKey = (entityKey) => {
  workGalahadDispatcher.dispatch({
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

  workGalahadDispatcher.dispatch({
    type: "nav/selectAppTabID",
    appTabID: id,
  });

  // d("WorkGalahadBeeperActions").clearBeepsForTabID(a)
};

const pushStackedChannel = (stackedChannelData) => {
  workGalahadDispatcher.dispatch({
    type: "nav/pushStackedChannel",
    stackedChannelData,
  });
};

const replaceStackedChannel = (stackedChannelData) => {
  setImmediateAcrossTransitions(() => {
    workGalahadDispatcher.dispatch({
      type: "nav/replaceStackedChannel",
      stackedChannelData,
    });
  });
};

const dismissStackedChannel = () => {
  workGalahadDispatcher.dispatch({
    type: "nav/dismissStackedChannel",
  });
};

const allowChannelAutoFocus = () => {
  workGalahadDispatcher.dispatch({
    type: "nav/allowChannelAutoFocus",
  });
};

const dismissAllStackedChannels = () => {
  workGalahadDispatcher.dispatch({
    type: "nav/dismissAllStackedChannels",
  });
};

const startLoading = (uri) => {
  workGalahadDispatcher.dispatch({
    type: "nav/startLoading",
    uri,
  });
};

const stopLoading = () => {
  workGalahadDispatcher.dispatch({
    type: "nav/stopLoading",
  });
};

const showPublicContentBanner = (html) => {
  workGalahadDispatcher.dispatch({
    type: "nav/showPublicContentBanner",
    html,
  });
};

const hidePublicContentBanner = () => {
  workGalahadDispatcher.dispatch({
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
