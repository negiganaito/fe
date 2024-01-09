/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useMemo, useReducer, useRef } from "react";

import { BaseView } from "../base-row";
import { CometPlaceholder } from "../comet-placeholder";
import { CometErrorBoundary } from "../error";

import { BaseCalloutReducer } from "./base-callout-reducer";

/*

__d("CometCalloutManager.react", 
  ["BaseCalloutManager.react", 
  "CometCalloutContext", 
  "ExecutionEnvironment", 
  "deferredLoadComponent", 
  "react", "requireDeferredForDisplay"], (function(a, b, c, d, e, f, g) {

*/

/*
__d("BaseCalloutManager.react", 
  ["BaseCalloutReducer", 
  "BaseView.react", 
  "CometErrorBoundary.react", 
  "CometPlaceholder.react", 
  "react"], (function(a, b, c, d, e, f, g) {

*/

export const BaseCalloutManager = ({
  children,
  context: Context,
  implementation: Implementation,
  initialState,
}) => {
  const [state, dispatch] = useReducer(BaseCalloutReducer, initialState);

  const imperativeRef = useRef(null);

  const addCallout = useCallback((payload) => {
    dispatch({
      payload,
      type: "addCallout",
    });
  }, []);

  const removeCallout = useCallback((a) => {
    dispatch({
      payload: a,
      type: "removeCallout",
    });
  }, []);

  const repositionCallout = useCallback(() => {
    let a;
    !(a = imperativeRef.current) ? void 0 : a.reposition();
  }, []);

  const contextValue = useMemo(() => {
    return {
      addCallout,
      removeCallout,
      repositionCallout,
    };
  }, [addCallout, removeCallout, repositionCallout]);

  return (
    <Context.Provider value={contextValue}>
      <BaseView>{children}</BaseView>
      <CometErrorBoundary>
        <CometPlaceholder fallback={null}>
          <Implementation {...state} imperativeRef={imperativeRef} />
        </CometPlaceholder>
      </CometErrorBoundary>
    </Context.Provider>
  );
};
