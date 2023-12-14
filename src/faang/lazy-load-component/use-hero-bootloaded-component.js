import { CometHeroInteractionContext } from '@/faang/trace/comet-hero-interaction-context';
import { useContext, useEffect } from 'react';

export function useHeroBootloadedComponent(props) {
  const context = useContext(CometHeroInteractionContext.Context);

  useEffect(() => {
    context.consumeBootload(props.getModuleId());
  }, [context, props]);
}
