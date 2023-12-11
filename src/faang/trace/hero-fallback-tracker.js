import { useContext, useLayoutEffect } from 'react';
import { HeroInteractionContext } from './hero-interaction-context';
import { HeroInteractionIDContext } from './hero-interaction-id-context';

// eslint-disable-next-line react/prop-types
export function HeroFallbackTracker({ uuid }) {
  const heroInteractionContextValue = useContext(HeroInteractionContext);
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext);

  useLayoutEffect(() => {
    if (heroInteractionIDContextValue != null) {
      heroInteractionContextValue.registerPlaceholder(
        heroInteractionIDContextValue,
        uuid,
        heroInteractionContextValue.pageletStack
      );

      return () => {
        heroInteractionContextValue.removePlaceholder(
          heroInteractionIDContextValue,
          uuid
        );
      };
    }
  }, [heroInteractionContextValue, heroInteractionIDContextValue, uuid]);

  return null;
}

HeroFallbackTracker.displayName = 'HeroFallbackTracker';
