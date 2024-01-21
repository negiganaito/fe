/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ExplicitRegistrationDispatcher } from "@/faang/flux";

// export const WorkGalahadDispatcher = new Dispatcher();

class WorkGalahadDispatcher extends ExplicitRegistrationDispatcher {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
}

export const workGalahadDispatcher = new WorkGalahadDispatcher({
  strict: true,
});
