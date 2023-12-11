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
  current: any;
};

export type HeroPlaceholderProps = {
  children?: any;
  fallback?: any;
  name?: string;
  unstable_avoidThisFallback?: any;
  unstable_onSuspense?: any;
};
