import { RootRoute, Router } from '@tanstack/react-router';
import { HomePage } from '@/app/layout';

import { IntlVariations, init } from 'fbt';

const viewerContext = {
  GENDER: IntlVariations.GENDER_UNKNOWN,
  locale: 'en_US',
};

init({
  // eslint-disable-next-line no-undef
  translations: require('./translatedFbts.json'),
  hooks: {
    getViewerContext: () => viewerContext,
  },
});

// const LOCALES = Object.freeze({
//   en_US: Object.freeze({
//     bcp47: 'en-US',
//     displayName: 'English (US)\u200e',
//     englishName: 'English (US)',
//     rtl: false,
//   }),
// });

// Create a root route
const rootRoute = new RootRoute({
  component: HomePage,
});

// Create the route tree using your routes
const routeTree = rootRoute;

// Create the router using your route tree
export const router = new Router({ routeTree });
