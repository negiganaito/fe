import { jsx } from 'react/jsx-runtime';
import { HeroInteractionContext } from './hero-interaction-context';
import { HeroCurrentInteractionForLoggingContext } from './hero-current-interaction-for-logging-context';
import { HeroInteractionIDContext } from './hero-interaction-id-context';

import { ProfilerContext } from 'react-relay/relay-hooks/ProfilerContext';

const heroCurrentInteractionForLoggingValue = {
  current: null,
};

const relayProfilerValue = {
  consumeBootload: function () {},
  retainQuery: function () {},
  wrapPrepareQueryResource: function (a) {
    return a();
  },
};

export function HeroInteractionContextPassthrough({ children, clear = true }) {
  return !clear
    ? children
    : jsx(HeroInteractionContext.Context.Provider, {
        value: HeroInteractionContext.DEFAULT_CONTEXT_VALUE,
        children: jsx(HeroCurrentInteractionForLoggingContext.Provider, {
          value: heroCurrentInteractionForLoggingValue,
          children: jsx(HeroInteractionIDContext.Provider, {
            value: null,
            children: jsx(ProfilerContext.Provider, {
              value: relayProfilerValue,
              children,
            }),
          }),
        }),
      });
}
