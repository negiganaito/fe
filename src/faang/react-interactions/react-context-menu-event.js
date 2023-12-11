import { useEffect } from 'react';
import { ReactEventHookPropagation } from './react-event-hook-propagation';
import { ReactUseEvent } from './react-use-event';

function useContextMenu(target, options) {
  const { disabled, onContextMenu, preventDefault } = options;

  const contextmenuHandler = ReactUseEvent('contextmenu');

  useEffect(() => {
    const curr = target.current;
    if (curr !== null) {
      contextmenuHandler.setListener(curr, (param) => {
        if (disabled === true) {
          return;
        }

        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            param,
            'useContextMenu'
          )
        ) {
          return;
        }

        ReactEventHookPropagation.stopEventHookPropagation(
          param,
          'useContextMenu'
        );

        if (preventDefault !== false && !param.nativeEvent.defaultPrevented) {
          param.preventDefault();
        }

        if (onContextMenu) {
          onContextMenu(param);
        }
      });
    }
  }, [disabled, target, contextmenuHandler, preventDefault, onContextMenu]);
}

export const ReactContextMenuEvent = { useContextMenu };
