import { useContext, useLayoutEffect } from 'react';
import { HeroInteractionIDContext } from './hero-interaction-id-context';
import { HeroInteractionContext } from './hero-interaction-context';

// eslint-disable-next-line react/prop-types
export function HeroHoldTrigger({ description, hold }) {
  // var b = a.description,
  //   e = a.hold,
  const interactionValue = useContext(HeroInteractionContext.Context);
  const interactionIDValue = useContext(HeroInteractionIDContext);
  useLayoutEffect(
    function () {
      if (hold && interactionIDValue != null) {
        var a = interactionValue.hold(
          interactionIDValue,
          interactionValue.pageletStack,
          description
        );
        return function () {
          interactionValue.unhold(interactionIDValue, a);
        };
      }
    },
    [description, interactionValue, interactionIDValue, hold]
  );
  return null;
}

HeroHoldTrigger.displayName = 'HeroHoldTrigger';
