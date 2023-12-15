/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { HeroComponent } from './hero-component';
import { HeroCurrentInteractionForLoggingContext } from './hero-current-interaction-for-logging-context';
import { HeroHoldTrigger } from './hero-hold-trigger';
import { HeroInteractionContext } from './hero-interaction-context';
import { HeroInteractionContextPassthrough } from './hero-interaction-context-passthrough';
import { HeroInteractionIDContext } from './hero-interaction-id-context';
import { HeroPendingPlaceholderTracker } from './hero-pending-placeholder-tracker';
import { HeroPlaceholder } from './hero-placeholder';
import { HeroPlaceholderUtils } from './hero-placeholder-utils';

export const HeroTracingPlaceholder = {
  HeroComponent,
  HeroCurrentInteractionForLoggingContext,
  HeroHoldTrigger,
  HeroInteractionContext: HeroInteractionContext,
  HeroInteractionContextPassthrough,
  HeroInteractionIDContext,
  HeroPendingPlaceholderTracker,
  HeroPlaceholder,
  HeroPlaceholderUtils,
};
