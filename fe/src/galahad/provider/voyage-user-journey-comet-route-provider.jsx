/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useLayoutEffect, useRef } from "react";

import { VoyageUserJourneyCometRouteContext } from "../context";

export const VoyageUserJourneyCometRouteProvider = ({ children, route }) => {
  const routeRef = useRef(route);

  useLayoutEffect(() => {
    routeRef.current = route;
  }, [route]);

  const a = useCallback(() => {
    return routeRef.current;
  }, []);

  return (
    <VoyageUserJourneyCometRouteContext.VoyageCometRouteContext.Provider
      value={a}
    >
      {children}
    </VoyageUserJourneyCometRouteContext.VoyageCometRouteContext.Provider>
  );
};
