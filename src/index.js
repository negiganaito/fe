/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { CometKeyboardSettingsStateProvider } from "@/faang/commet-key-commands";
import { WorkGalahadDarkModeStateProvider } from "@/galahad/provider";

import "../i18n/fbtInit";

import { router } from "./route";

import "./styles/app.css";

const rootElement = document.getElementById("root");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <CometKeyboardSettingsStateProvider>
      <WorkGalahadDarkModeStateProvider>
        <RouterProvider router={router} />
      </WorkGalahadDarkModeStateProvider>
    </CometKeyboardSettingsStateProvider>
  );
}
