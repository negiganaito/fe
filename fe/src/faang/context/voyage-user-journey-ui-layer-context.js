/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext, useContext } from "react";

/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const VoyageUILayerContext = createContext({
  get: function () {
    return [];
  },
});

function useVoyageUILayerContext() {
  return useContext(VoyageUILayerContext);
}

export const VoyageUserJourneyUILayerContext = {
  VoyageUILayerContext,
  useVoyageUILayerContext,
};
