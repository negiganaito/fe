/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { RelayEnvironment } from "@/faang/@relay/environment";
import { CometKeyboardSettingsStateProvider } from "@/faang/commet-key-commands";
import { WorkGalahadDarkModeStateProvider } from "@/galahad/provider";
import { AppTabIdHandler } from "@/galahad/provider/app-tab-id-handler";
import { PipedriveRouteContext } from "@/galahad/provider/pipedrive-route-context";

import "../i18n/fbtInit";

import { router } from "./route";

import "./styles/app.css";

const rootElement = document.getElementById("root");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <RouterProvider router={router}>
      <AppTabIdHandler>
        <PipedriveRouteContext>
          <RelayEnvironment>
            <React.Suspense fallback="Loading">
              <CometKeyboardSettingsStateProvider>
                <WorkGalahadDarkModeStateProvider />
              </CometKeyboardSettingsStateProvider>
            </React.Suspense>
          </RelayEnvironment>
        </PipedriveRouteContext>
      </AppTabIdHandler>
    </RouterProvider>
  );
}
