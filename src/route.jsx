import { RootRoute, Router } from '@tanstack/react-router';
import { HomePage } from '@/app/layout';

// Create a root route
const rootRoute = new RootRoute({
  component: HomePage,
});

// Create the route tree using your routes
const routeTree = rootRoute;

// Create the router using your route tree
export const router = new Router({ routeTree });
