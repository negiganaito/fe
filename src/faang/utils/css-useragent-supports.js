import { isBrowser } from 'fbjs/lib/UserAgent';

export const cssUserAgentSupports = {
  webkitLineClamp: () =>
    isBrowser('IE') || isBrowser('Edge < 17') || isBrowser('Firefox < 68'),
};
