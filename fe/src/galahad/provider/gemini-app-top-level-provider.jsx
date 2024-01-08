/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { VoyageUserJourneyCometRouteProvider } from "./voyage-user-journey-comet-route-provider";

export const GeminiAppTopLevelProvider = () => {
  return (
    <VoyageUserJourneyCometRouteProvider>
      <GeminiVariantState />
    </VoyageUserJourneyCometRouteProvider>
  );
};
