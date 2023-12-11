import { ReactHoverEvent } from './react-hover-event';

export function usePressability(targetRef, options) {
  const {
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
  } = options;

  ReactHoverEvent.useHover(targetRef, {
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
  });

  ReactPressEvent.usePress(targetRef, {
    disabled,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
  });

  ReactFocusEvent.useFocus(targetRef, {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  });

  ReactContextMenuEvent.useContextMenu(targetRef, {
    disabled,
    onContextMenu,
    preventDefault: preventContextMenu || false,
  });
}
