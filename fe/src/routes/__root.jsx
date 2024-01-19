/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { WorkGalahadDarkModeStateProvider } from "@/galahad/provider";
import { AppTabIdHandler } from "@/galahad/provider/app-tab-id-handler";
import { GeminiApp } from "@/galahad/provider/gemini-app";
import { PipedriveRouteContext } from "@/galahad/provider/pipedrive-route-context";
import { WorkGalahadNavStoreProvider } from "@/galahad/provider/work-galahad-nav-store";

export const Route = rootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <WorkGalahadNavStoreProvider>
        <AppTabIdHandler>
          <PipedriveRouteContext>
            <GeminiApp>
              <React.Suspense fallback="Loading">
                <WorkGalahadDarkModeStateProvider>
                  <Outlet />
                </WorkGalahadDarkModeStateProvider>
              </React.Suspense>
            </GeminiApp>
          </PipedriveRouteContext>
        </AppTabIdHandler>
      </WorkGalahadNavStoreProvider>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
