import "./App.css";

import stylex from "@stylexjs/stylex";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";

const MEDIA_MOBILE = "@media (max-width: 700px)";

const s = stylex.create({
  h1: {
    fontSize: "4rem",
    lineHeight: 1,
    fontFamily: "system-ui, sans-serif",
    fontWeight: 400,
    textAlign: "center",
    display: "flex",
    gap: 8,
    whiteSpace: "nowrap",
    flexDirection: {
      default: "row",
      [MEDIA_MOBILE]: "column",
    },
    color: "var(--fds-blue-60)",
  },
  body: {
    fontSize: "1rem",
    fontFamily: "system-ui, sans-serif",
  },
  p: {
    marginTop: 16,
    lineHeight: 1.4,
  },
  li: {
    marginTop: 8,
  },
  link: {
    color: "#4dabf7",
  },
  emoji: {
    position: "relative",
    fontFamily: "sans-serif",
    top: {
      default: 0,
      [MEDIA_MOBILE]: 2,
    },
  },
});

// Create a root route
const rootRoute = new RootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />

      <h1 className={stylex(s.h1)}>
        Vite
        <span className={stylex(s.emoji)}>♥️</span>️ StyleX
      </h1>

      <Outlet />
    </>
  );
}

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutComponent,
});

function AboutComponent() {
  return <div>Hello from About!</div>;
}

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

// Render our app!
const rootElement = document.getElementById("app");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
