/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React from "react";
import { Outlet } from "@tanstack/react-router";

export const IndexPage = () => {
  return (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
};
