/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { invariant } from "@/faang/utils";

export class EventSubscriptionVendor {
  constructor() {
    this.$1 = {};
  }

  addSubscription(eventType, subscriber) {
    if (subscriber !== this) {
      invariant(0, 2828);
    }

    this.$1[eventType] || (this.$1[eventType] = []);

    const key = this.$1[eventType].length;
    this.$1[eventType].push(subscriber);
    subscriber.eventType = eventType;
    subscriber.key = key;

    return subscriber;
  }

  removeAllSubscriptions(eventType) {
    if (eventType === undefined) {
      this.$1 = {};
    } else {
      delete this.$1[eventType];
    }
  }

  removeSubscription(subscriber) {
    const eventType = subscriber.eventType;
    const key = subscriber.key;
    const subscriptions = this.$1[eventType];

    if (subscriptions) {
      delete subscriptions[key];
    }
  }

  getSubscriptionsForType(eventType) {
    return this.$1[eventType];
  }
}
