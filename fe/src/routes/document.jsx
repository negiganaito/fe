/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { FileRoute, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/document").createRoute({
  component: DashboardComponent,
});

function DashboardComponent() {
  return <Outlet />;
}