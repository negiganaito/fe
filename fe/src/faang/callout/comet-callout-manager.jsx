/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { executionEnvironment } from "../utils";

import { BaseCalloutManager } from "./base-callout-manager";
import { CometCalloutContext } from "./comet-callout-context";
import { CometCalloutImpl } from "./comet-callout-impl";

const _initialState = {
  anchorRootRefContext: {
    current: executionEnvironment.canUseDOM ? document.body : null,
  },
  animationContext: null,
  calloutID: null,
  contextRef: null,
  scrollableAreaContext: [],
};

export function CometCalloutManager({
  initialState = _initialState,
  children,
}) {
  return (
    <BaseCalloutManager
      context={CometCalloutContext}
      implementation={CometCalloutImpl}
      initialState={initialState}
    >
      {children}
    </BaseCalloutManager>
  );
}
