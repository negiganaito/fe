/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { jsx } from "react/jsx-runtime";

import { RelayProfilerContext } from "@/faang/context";

// import { ProfilerContext } from 'react-relay/relay-hooks/ProfilerContext';
import { HeroCurrentInteractionForLoggingContext } from "./hero-current-interaction-for-logging-context";
import { HeroInteractionContext } from "./hero-interaction-context";
import { HeroInteractionIDContext } from "./hero-interaction-id-context";

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
        children: jsx(HeroCurrentInteractionForLoggingContext.Provider, {
          children: jsx(HeroInteractionIDContext.Provider, {
            children: jsx(RelayProfilerContext.Provider, {
              children,
              value: relayProfilerValue,
            }),
            value: null,
          }),
          value: heroCurrentInteractionForLoggingValue,
        }),
        value: HeroInteractionContext.DEFAULT_CONTEXT_VALUE,
      });
}
