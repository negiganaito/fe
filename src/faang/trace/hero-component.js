import { useLayoutEffect, useContext, memo } from 'react';
import HeroInteractionIDContext from './hero-interaction-id-context';
import { HeroInteractionContext } from './hero-interaction-context';

function heroComponent(props) {
  const { description } = props;

  var e = useContext(HeroInteractionContext.Context),
    f = useContext(HeroInteractionIDContext);
  useLayoutEffect(
    function () {
      f != null && e.logHeroRender(f, description, e.pageletStack);
    },
    [description, e, f]
  );
  return null;
}

heroComponent.displayName = 'HeroComponent';

export const HeroComponent = memo(heroComponent);
