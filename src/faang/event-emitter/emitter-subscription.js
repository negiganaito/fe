/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { EventSubscription } from "./event-subscription";

export class EmitterSubscription extends EventSubscription {
  constructor(b, c, d) {
    super(b);
    this.listener = c;
    this.context = d;
  }
}
