/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { BaseSuppressHovercards } from "@/faang/card";
import { FocusAppWrapper } from "@/faang/common";
import { CometTransientDialogProvider } from "@/faang/dialog/comet-transient-dialog-provider";
import { CometLayerKeyCommandWrapper } from "@/galahad/config";
import { GeminiVariantState } from "@/galahad/config/gemini-variant-state";

import { VoyageUserJourneyCometRouteProvider } from "./voyage-user-journey-comet-route-provider";

export const GeminiAppTopLevelProvider = () => {
  return (
    <VoyageUserJourneyCometRouteProvider>
      <GeminiVariantState.Provider>
        <CometLayerKeyCommandWrapper>
          <FocusAppWrapper>
            <CometTransientDialogProvider>
              <BaseSuppressHovercards.BaseSuppressHovercardsContext.Provider
                value={false}
              >
                <CometCalloutManager />
              </BaseSuppressHovercards.BaseSuppressHovercardsContext.Provider>
            </CometTransientDialogProvider>
          </FocusAppWrapper>
        </CometLayerKeyCommandWrapper>
      </GeminiVariantState.Provider>
    </VoyageUserJourneyCometRouteProvider>
  );
};
