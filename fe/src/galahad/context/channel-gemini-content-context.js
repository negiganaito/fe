/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { loadEntryPoint, useRelayEnvironment } from "react-relay/hooks";
import useFluxStore from "flux-hooks";

// import { createCometRelayBaseEntryPointEnvironmentProvider } from "@/faang/@relay/create-comet-relay-base-entry-point-environment-provider";
import { relayEnvironment } from "@/faang/@relay/environment";
import { JSScheduler, RunComet } from "@/faang/common";
import { unrecoverableViolation } from "@/faang/error";

import { WorkAppTabSet } from "../config/work-app-tab-set";
import { workGalahadNavStore } from "../store/work-galahad-nav-store";

const Context = React.createContext({
  preloadedEntryPoints: {},
  currentAppTabID: null,
  setPreloadedEntryPoint: function (a, b) {},
});

function getSelectedAppTabID() {
  return workGalahadNavStore.getSelectedAppTabID();
}

let isPreloadingEnabled = !1;
let preloadTriggerID = null;
let preloadedEntryPointsMap = null;

const _1756551 = true;

const WorkGalahadChannelContentContextProvider = ({ children }) => {
  const selectedAppTabID = useFluxStore(
    workGalahadNavStore,
    getSelectedAppTabID
  );
  const environment = useRelayEnvironment();

  const relayOptions = useMemo(() => {
    return {
      getEnvironment: function (a) {
        return environment;
      },
    };
  }, [environment]);

  const [preloadedEntryPoints, setPreloadedEntryPoints] = useState(
    preloadedEntryPointsMap || {}
  );

  useEffect(() => {
    let onLoadListener = RunComet.onLoad(() => {
      JSScheduler.scheduleSpeculativeCallback(() => {
        if (isPreloadingEnabled || !preloadTriggerID || !_1756551) {
          return;
        }
        let entryPointsToPreload = {};
        // eslint-disable-next-line max-nested-callbacks
        WorkAppTabSet.forEach((tab) => {
          // tab.id !== preloadTriggerID &&
          //   tab.channelEntryPoint &&
          //   tab.skipPreload !== !0 &&
          //   (entryPointsToPreload[tab.id] = loadEntryPoint(
          //     relayOptions,
          //     tab.channelEntryPoint,
          //     {}
          //   ));

          if (
            tab.id !== preloadTriggerID &&
            tab.channelEntryPoint &&
            tab.skipPreload !== true
          ) {
            entryPointsToPreload[tab.id] = loadEntryPoint(
              relayOptions,
              tab.channelEntryPoint,
              {}
            );
          }
        });
        // eslint-disable-next-line max-nested-callbacks
        setPreloadedEntryPoints((currentEntryPoints) => {
          return { ...currentEntryPoints, ...entryPointsToPreload };
        });
        isPreloadingEnabled = true;
      });
    });
    return () => {
      return onLoadListener.remove();
    };
  }, [relayOptions]);

  let updatePreloadedEntryPoints = useCallback(
    (tabID, entryPoint) => {
      if (Object.prototype.hasOwnProperty.call(preloadedEntryPoints, tabID)) {
        return;
      }
      // setPreloadedEntryPoints((currentEntryPoints) => {
      //   // eslint-disable-next-line no-return-assign
      //   return {
      //     ...currentEntryPoints,
      //     ...((currentEntryPoints = {}),
      //     (currentEntryPoints[tabID] = entryPoint),
      //     currentEntryPoints),
      //   };
      // });
      setPreloadedEntryPoints((currentEntryPoints) => ({
        ...currentEntryPoints,
        [tabID]: entryPoint,
      }));
    },
    [preloadedEntryPoints]
  );

  const contextValue = useMemo(() => {
    return {
      preloadedEntryPoints: preloadedEntryPoints,
      currentAppTabID: selectedAppTabID,
      setPreloadedEntryPoint: updatePreloadedEntryPoints,
    };
  }, [preloadedEntryPoints, selectedAppTabID, updatePreloadedEntryPoints]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const init = (id, entry) => {
  preloadTriggerID = id;

  if (preloadTriggerID === "profile") {
    // TODO
  }

  const tab = WorkAppTabSet.find((tab) => {
    return tab.id === preloadTriggerID;
  });

  if (!tab ? undefined : tab.channelEntryPoint) {
    preloadedEntryPointsMap = loadEntryPoint(
      // createCometRelayBaseEntryPointEnvironmentProvider(
      //   CometRelayEnvironmentFactory.CometRelayEnvironmentFactory
      // ),
      relayEnvironment,
      tab.channelEntryPoint,
      {}
    );
  } else if (entry) {
    preloadedEntryPointsMap = loadEntryPoint(
      // createCometRelayBaseEntryPointEnvironmentProvider(
      //   CometRelayEnvironmentFactory.CometRelayEnvironmentFactory
      // ),
      relayEnvironment,
      entry,
      {}
    );
  } else {
    throw unrecoverableViolation(
      "couldnt find an entrypoint for current channel",
      "work_comet_core"
    );
  }
};

export const ChannelGeminiContentContext = {
  ChannelGeminiContentContext: Context,
  WorkGalahadChannelContentContextProvider,
  init,
};
