/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { RelayEnvironment } from "@/faang/@relay/environment";
import { CometCalloutManager } from "@/faang/callout/comet-callout-manager";
import { BaseSuppressHovercards } from "@/faang/card";
import { CometKeyboardSettingsStateProvider } from "@/faang/commet-key-commands";
import { CometTransientDialogProvider } from "@/faang/dialog/comet-transient-dialog-provider";
import { FocusAppWrapper } from "@/galahad/common";
import { CometLayerKeyCommandWrapper } from "@/galahad/config";
import { GeminiVariantState } from "@/galahad/config/gemini-variant-state";

import { VoyageUserJourneyCometRouteProvider } from "./voyage-user-journey-comet-route-provider";

export const GeminiAppTopLevelProvider = ({ children }) => {
  return (
    <RelayEnvironment>
      <VoyageUserJourneyCometRouteProvider>
        <GeminiVariantState.Provider>
          {/* TODO */}
          <CometKeyboardSettingsStateProvider>
            <CometLayerKeyCommandWrapper>
              <FocusAppWrapper>
                <CometTransientDialogProvider>
                  <BaseSuppressHovercards.BaseSuppressHovercardsContext.Provider
                    value={false}
                  >
                    <CometCalloutManager>{children}</CometCalloutManager>
                  </BaseSuppressHovercards.BaseSuppressHovercardsContext.Provider>
                </CometTransientDialogProvider>
              </FocusAppWrapper>
            </CometLayerKeyCommandWrapper>
          </CometKeyboardSettingsStateProvider>
        </GeminiVariantState.Provider>
      </VoyageUserJourneyCometRouteProvider>
    </RelayEnvironment>
  );
};
