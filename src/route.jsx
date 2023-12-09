import React from 'react';
import { Outlet, Link, Router, Route, RootRoute } from '@tanstack/react-router';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    width: '100%',
    maxWidth: 800,
    minHeight: 40,
  },
  child: {
    backgroundColor: 'black',
    marginBlock: '1rem',
  },
});

const colorStyles = stylex.create({
  red: {
    backgroundColor: 'lightred',
    borderColor: 'darkred',
  },
  green: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
  },
});

const RootComponent = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
};

const IndexComponent = () => {
  return (
    <div>
      <h1 {...stylex.props(colorStyles.green, styles.root)}>sdad</h1>
    </div>
  );
};

const AboutComponent = () => {
  return <div>Hello from About!</div>;
};

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutComponent,
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
});

// Create a root route
const rootRoute = new RootRoute({
  component: RootComponent,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });
