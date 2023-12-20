/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { RootRoute, Route, Router } from "@tanstack/react-router";

import { HomePage } from "@/app/home/layout";
import { LoginPage } from "@/app/login/layout";
import { IndexPage } from "@/app/layout";

const rootRoute = new RootRoute({
  component: IndexPage,
});

const homeRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: (val) => {
    console.log({ val });
  },
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([homeRoute, loginRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });
