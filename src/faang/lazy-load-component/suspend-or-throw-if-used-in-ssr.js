/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import executionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { CometSSRClientRender } from "./comet-ssr-client-render";

export function suspendOrThrowIfUsedInSSR(a) {
  if (!executionEnvironment.isInBrowser) {
    throw CometSSRClientRender(a);
  }
}
