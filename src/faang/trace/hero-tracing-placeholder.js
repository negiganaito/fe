import { HeroComponent } from './hero-component';
import { HeroHoldTrigger } from './hero-hold-trigger';
import { HeroInteractionContext } from './hero-interaction-context';
import { HeroInteractionIDContext } from './hero-interaction-id-context';
import { HeroCurrentInteractionForLoggingContext } from './hero-current-interaction-for-logging-context';
import { HeroPendingPlaceholderTracker } from './hero-pending-placeholder-tracker';
import { HeroPlaceholderUtils } from './hero-placeholder-utils';
import { HeroInteractionContextPassthrough } from './hero-interaction-context-passthrough';
import { HeroPlaceholder } from './hero-placeholder';

export const HeroTracingPlaceholder = {
  HeroComponent,
  HeroHoldTrigger,
  HeroInteractionContext: HeroInteractionContext,
  HeroInteractionContextPassthrough,
  HeroInteractionIDContext,
  HeroCurrentInteractionForLoggingContext,
  HeroPendingPlaceholderTracker,
  HeroPlaceholder,
  HeroPlaceholderUtils,
};
