/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { createContext, useContext } from "react";

const VoyageCometRouteContext = createContext(() => {
  return null;
});

function useVoyageCometRouteContext() {
  return useContext(VoyageCometRouteContext);
}

export const VoyageUserJourneyCometRouteContext = {
  VoyageCometRouteContext,
  useVoyageCometRouteContext,
};
