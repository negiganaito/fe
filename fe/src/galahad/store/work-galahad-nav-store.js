/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ReduceStore } from "flux/utils";

const defaultVariable = () => {
  return {
    lastNavigationIntentTimestamp: Date.now(),
  };
};

export class WorkGalahadNavStore extends ReduceStore {
  constructor(props) {
    super(props);
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
      }
    };
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
