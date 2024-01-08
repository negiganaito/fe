/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { createContext, useContext, useMemo, useReducer } from "react";

// type SelectedAppTabID =
//   | 'home'
//   | 'notification'
//   | 'knowledge'
//   | 'chat'
//   | 'profile'

// export type WorkGalahadNavStoreState = {
//   activeEntityKey?: any
//   loading: boolean
//   selectedAppTabID: string
//   allowChannelAutoFocus: boolean
//   lastNavigationIntentTimestamp: number
//   publicContentBanner?: any
//   stackedChannelData: any[]
//   pendingTransitionState?: any
// }

export const selectAppTabID = (appTabID) => ({
  type: "nav/selectAppTabID",
  payload: {
    appTabID,
  },
});

export const allowChannelAutoFocus = () => ({
  type: "nav/allowChannelAutoFocus",
  payload: undefined,
});

export const dismissAllStackedChannels = () => ({
  type: "nav/dismissAllStackedChannels",
  payload: undefined,
});

export const markPendingTransition = (appTabID, entityKey, uri) => ({
  type: "nav/markPendingTransition",
  payload: {
    appTabID,
    entityKey,
    uri,
  },
});

export const pushStackedChannel = (stackedChannelData) => ({
  type: "nav/pushStackedChannel",
  payload: {
    stackedChannelData,
  },
});

export const dismissStackedChannel = () => ({
  type: "nav/dismissStackedChannel",
  payload: undefined,
});

export const replaceStackedChannel = (stackedChannelData) => ({
  type: "nav/replaceStackedChannel",
  payload: { stackedChannelData },
});

// type WorkGalahadNavStoreAction =
//   | ReturnType<typeof selectAppTabID>
//   | ReturnType<typeof allowChannelAutoFocus>
//   | ReturnType<typeof dismissAllStackedChannels>
//   | ReturnType<typeof markPendingTransition>
//   | ReturnType<typeof pushStackedChannel>
//   | ReturnType<typeof dismissStackedChannel>
//   | ReturnType<typeof replaceStackedChannel>

const workGalahadNavStoreInitial = {
  activeEntityKey: null,
  loading: false,
  selectedAppTabID: window.location.pathname.split("/")[1],
  allowChannelAutoFocus: false,
  lastNavigationIntentTimestamp: 0,
  publicContentBanner: undefined,
  stackedChannelData: [],
  pendingTransitionState: undefined,
};

const navigationIntentTimestampProvider = () => {
  return {
    lastNavigationIntentTimestamp: Date.now(),
  };
};

const workGalahadNavStoreReducer = (state, { payload, type }) => {
  switch (type) {
    case "nav/allowChannelAutoFocus": {
      return { ...state, allowChannelAutoFocus: true };
    }

    case "nav/dismissAllStackedChannels": {
      return {
        ...state,
        ...navigationIntentTimestampProvider(),
        stackedChannelData: [],
      };
    }

    case "nav/pushStackedChannel": {
      const { stackedChannelData } = payload;

      return {
        ...state,
        ...navigationIntentTimestampProvider(),
        // @ts-ignore
        stackedChannelData: [].concat(state.stackedChannelData, [
          stackedChannelData,
        ]),
      };
    }

    case "nav/dismissStackedChannel": {
      return {
        ...state,
        ...navigationIntentTimestampProvider(),
        stackedChannelData: state.stackedChannelData.slice(0, -1),
      };
    }

    case "nav/replaceStackedChannel": {
      const { stackedChannelData } = payload;
      return {
        ...state,
        // @ts-ignore
        stackedChannelData: [].concat(state.stackedChannelData.slice(0, -1), [
          stackedChannelData,
        ]),
      };
    }

    case "nav/markPendingTransition": {
      const { appTabID, entityKey, uri } = payload;

      return {
        ...state,
        ...navigationIntentTimestampProvider(),
        pendingTransitionState: {
          appTabID,
          entityKey,
          uri,
        },
      };
    }

    case "nav/selectAppTabID": {
      const { appTabID } = payload;

      return state.selectedAppTabID !== appTabID
        ? {
            ...state,
            ...navigationIntentTimestampProvider(),
            selectedAppTabID: appTabID,
            stackedChannelData: [],
          }
        : { ...state, ...navigationIntentTimestampProvider() };
    }

    default:
      return state;
  }
};

const getSelectedAppTabID = (state) => state.selectedAppTabID;

const getActiveEntityKey = (state) => state.activeEntityKey;

const getNavigationKey = (state) =>
  "navigation-key-" + state.lastNavigationIntentTimestamp;

const isChannelAutoFocusAllowed = (state) => state.allowChannelAutoFocus;

const getStackedChannelData = ({ stackedChannelData }) =>
  stackedChannelData[stackedChannelData.length - 1];

const WorkGalahadNavStoreContext = createContext({});

export const WorkGalahadNavStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    workGalahadNavStoreReducer,
    workGalahadNavStoreInitial
  );

  const memoizedState = useMemo(() => state, [state]);

  return (
    <WorkGalahadNavStoreContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ state: memoizedState, dispatch }}
    >
      {children}
    </WorkGalahadNavStoreContext.Provider>
  );
};

export const useWorkGalahadNavStore = () => {
  const context = useContext(WorkGalahadNavStoreContext);

  if (context === undefined) {
    throw new Error("useWorkGalahadNavStore was used outside of its Provider");
  }
  return context;
};

export const WorkGalahadNavStore = {
  getSelectedAppTabID,
  getActiveEntityKey,
  getNavigationKey,
  isChannelAutoFocusAllowed,
  getStackedChannelData,
  useWorkGalahadNavStore,
  selectAppTabID,
};
