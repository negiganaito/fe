/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export type HeroInteractionContextValue = {
  consumeBootload: typeof fn;
  hold: typeof fn;
  logHeroRender: typeof fn;
  logMetadata: typeof fn;
  logPageletVC: typeof fn;
  logReactCommit: typeof fn;
  logReactPostCommit: typeof fn;
  logReactRender: typeof fn;
  pageletStack: [];
  registerPlaceholder: typeof fn;
  removePlaceholder: typeof fn;
  suspenseCallback: typeof fn;
  unhold: typeof fn;
};

export type HeroCurrentInteractionForLoggingContextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: any;
};

export type HeroPlaceholderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback?: any;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unstable_avoidThisFallback?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unstable_onSuspense?: any;
};
