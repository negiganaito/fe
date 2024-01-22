/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ReduceStore } from "flux/utils";

import { WorkGalahadAppTabIDUtil } from "../config";

import { workGalahadDispatcher } from "./work-galahad-dispatcher";

const defaultVariable = () => {
  return {
    lastNavigationIntentTimestamp: Date.now(),
  };
};

class WorkGalahadNavStore extends ReduceStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.reduce = (state, action) => {
      switch (action.type) {
        case "nav/markPendingTransition": {
          return {
            ...state,
            ...defaultVariable(),
            pendingTransitionState: {
              appTabID: action.appTabID,
              entityKey: action.entityKey,
              uri: action.uri,
            },
          };
        }

        case "nav/setActiveEntityKey": {
          return this.$WorkGalahadNavStore$p_1(state, action.entityKey);
        }

        case "nav/selectAppTabID": {
          return this.$WorkGalahadNavStore$p_2(state, action.appTabID);
        }

        case "nav/allowChannelAutoFocus": {
          return { ...state, allowChannelAutoFocus: true };
        }

        case "nav/pushStackedChannel": {
          return {
            ...state,
            ...defaultVariable(),
            stackedChannelData: [].concat(state.stackedChannelData, [
              action.stackedChannelData,
            ]),
          };
        }

        case "nav/replaceStackedChannel": {
          return {
            ...state,
            stackedChannelData: [].concat(
              state.stackedChannelData.slice(0, -1),
              [action.stackedChannelData]
            ),
          };
        }

        case "nav/dismissStackedChannel": {
          return {
            ...state,
            ...defaultVariable(),
            stackedChannelData: state.stackedChannelData.slice(0, -1),
          };
        }

        case "nav/dismissAllStackedChannels": {
          return { ...state, ...defaultVariable(), stackedChannelData: [] };
        }

        case "nav/startLoading": {
          let newState = { ...state, loading: true };

          if (
            action.uri === !newState
              ? undefined
              : !newState.pendingTransitionState
              ? undefined
              : newState.pendingTransitionState.uri
          ) {
            newState = this.$WorkGalahadNavStore$p_1(
              newState,
              (!newState.pendingTransitionState
                ? undefined
                : newState.pendingTransitionState.entityKey) ||
                newState.activeEntityKey
            );

            newState = this.$WorkGalahadNavStore$p_2(
              newState,
              (!newState.pendingTransitionState
                ? undefined
                : newState.pendingTransitionState.appTabID) ||
                newState.selectedAppTabID
            );
          }

          return { ...newState, pendingTransitionState: undefined };
        }

        case "nav/stopLoading": {
          return { ...state, loading: false };
        }

        case "nav/showPublicContentBanner": {
          return { ...state, publicContentBanner: action.html };
        }

        case "nav/hidePublicContentBanner": {
          return { ...state, publicContentBanner: undefined };
        }

        default:
          return state;
      }
    };
  }

  getInitialState() {
    return {
      activeEntityKey: null,
      loading: false,
      selectedAppTabID: WorkGalahadAppTabIDUtil.getProductSpecificHomeTabID(),
      allowChannelAutoFocus: false,
      lastNavigationIntentTimestamp: 0,
      publicContentBanner: undefined,
      stackedChannelData: [],
      pendingTransitionState: undefined,
    };
  }

  getActiveEntityKey() {
    return this.getState().activeEntityKey;
  }

  getSelectedAppTabID() {
    return this.getState().selectedAppTabID;
  }

  getNavigationKey() {
    return "navigation-key-" + this.getState().lastNavigationIntentTimestamp;
  }

  isChannelAutoFocusAllowed() {
    return this.getState().allowChannelAutoFocus;
  }

  getStackedChannelData() {
    const stackedChannelData = this.getState().stackedChannelData;
    return stackedChannelData[stackedChannelData.length - 1];
  }

  isLoading() {
    return this.getState().loading;
  }

  getPublicContentBanner() {
    return this.getState().publicContentBanner;
  }

  $WorkGalahadNavStore$p_1 = (state, entityKey) => {
    return state.activeEntityKey === entityKey
      ? state
      : { ...state, activeEntityKey: entityKey };
  };

  $WorkGalahadNavStore$p_2 = (state, appTabID) => {
    return state.selectedAppTabID !== appTabID
      ? {
          ...state,
          ...defaultVariable(),
          selectedAppTabID: appTabID,
          stackedChannelData: [],
        }
      : { ...state, ...defaultVariable() };
  };
}

export const workGalahadNavStore = new WorkGalahadNavStore(
  workGalahadDispatcher
);
