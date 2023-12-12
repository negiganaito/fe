import * as stylex from '@stylexjs/stylex';

import { useCallback, useContext, useState, useEffect, useRef } from 'react';

import { jsx } from 'react/jsx-runtime';

import UserAgent from 'fbjs/lib/UserAgent';
import joinClasses from 'fbjs/lib/joinClasses';

import { passiveEventListenerUtil } from '@/faang/react-interactions/passive-event-listener-util';

import { WebPressableGroupContext } from '@/faang/context/web-pressable-group-context';

import { WebPressability } from '@/faang/react-interactions/web-pressability';

import { Link } from '@tanstack/react-router';

// Assuming there is a function c("UserAgent").isBrowser() that checks the user agent
// It returns true if the user agent is "Safari" or "Mobile Safari", otherwise false
const isSafariOrMobileSafari =
  UserAgent.isBrowser('Safari') || UserAgent.isBrowser('Mobile Safari');

const styles = stylex.create({
  disabled: {
    cursor: 'not-allowed',
  },

  focusNotVisible: {
    outlineStyle: 'none',
  },

  root: {
    WebkitTapHighlightColor: 'transparent',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    border: '0 solid var(--always-dark-overlay)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    listStyleType: 'none',
    margin: '0',
    minHeight: 0,
    minWidth: 0,
    padding: '0',
    position: 'relative',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    touchAction: 'manipulation',
    zIndex: 0,
  },

  rootInGroup: {
    touchAction: 'none',
  },
});

const validElementTypes = ['menuitem', 'tab', 'none'];

const specialElements = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  figure: 'figure',
  form: 'form',
  heading: 'h1',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  none: 'div',
  region: 'section',
};

/**
 *
 * @param {string} elementType
 * @param {{ url?: string,attributionsrc?: any,download?: any,rel?: any,target?: any}} additionalData
 * @returns {string}
 */
function determineElementTag(elementType, additionalData) {
  let tag = 'div';

  if (
    validElementTypes.includes(elementType) &&
    additionalData != null &&
    additionalData.url != null
  ) {
    tag = 'a';
  } else if (elementType != null) {
    /**
     * @type {string | undefined}
     */
    const mappedTag = specialElements[elementType];
    if (mappedTag != null) {
      tag = mappedTag;
    }

    return tag;
  }

  // let tag = 'div';
  // if (
  //   Object.keys(specialElements).includes(elementType) &&
  //   additionalData !== undefined &&
  //   additionalData.url != undefined
  // ) {
  //   tag = 'a';
  // } else if (elementType !== undefined) {
  //   /**
  //    * @type {string | undefined}
  //    */
  //   const mappedTag = specialElements[elementType];
  //   if (mappedTag !== undefined) {
  //     tag = mappedTag;
  //   }
  // }
  // return tag;
}

function useChainedCallbacks(callbackA, callbackB) {
  return useCallback(
    (arg) => {
      callbackA(arg);
      if (callbackB) {
        callbackB(arg);
      }
    },
    [callbackA, callbackB]
  );
}

/**
 *
 * @param {HTMLElement} a
 * @returns {boolean}
 */
function isElementInDocument(a) {
  return (
    typeof document !== 'undefined' &&
    typeof document.contains === 'function' &&
    document.contains(a)
  );
}

function hasValidAncestorAnchor(el) {
  let elTemp = el;
  while (elTemp !== null) {
    if (elTemp.tagName === 'A' && elTemp.href !== null) {
      return true;
    }
    elTemp = elTemp.parentNode;
  }
  return false;
}

function shouldHandleClickEvent(event, preventDefault) {
  const { altKey, ctrlKey, currentTarget, metaKey, shiftKey, target } = event;
  // var d = event.altKey,
  //   e = event.ctrlKey,
  //   f = event.currentTarget,
  //   g = event.metaKey,
  //   h = event.shiftKey
  // event = event.target

  var i = target;
  // c('justknobx')._('450') &&
  i = isElementInDocument(target) ? target : currentTarget;
  event = hasValidAncestorAnchor(i);
  const key = altKey || ctrlKey || metaKey || shiftKey;
  return preventDefault !== false && event && !key;
}

// var s = function (el) {
//   var b = el.target,
//     c = b.tagName;
//   c =
//     b.isContentEditable ||
//     (c === 'A' && b.href != null) ||
//     c === 'BUTTON' ||
//     c === 'INPUT' ||
//     c === 'SELECT' ||
//     c === 'TEXTAREA';
//   if (b.tabIndex === 0 && !c) {
//     c = el.key;
//     if (c === 'Enter') return true;
//     el = b.getAttribute('role');
//     if (
//       (c === ' ' || c === 'Spacebar') &&
//       (el === 'button' ||
//         el === 'checkbox' ||
//         el === 'combobox' ||
//         el === 'menuitem' ||
//         el === 'menuitemcheckbox' ||
//         el === 'menuitemradio' ||
//         el === 'option' ||
//         el === 'radio' ||
//         el === 'switch' ||
//         el === 'tab')
//     )
//       return true;
//   }
//   return false;
// };

/**
 * Determines whether a key event on a target element should trigger an action.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {boolean} - True if the event should trigger an action, otherwise false.
 */
const shouldTriggerActionForKeyEvent = (event) => {
  // Retrieve target element and its tag name
  const targetElement = event.target;
  const tagName = targetElement.tagName;

  // Check conditions related to the element's type
  const isContentEditable =
    targetElement.isContentEditable ||
    (tagName === 'A' && targetElement.href != null) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA';

  // Check conditions based on tabIndex and key event
  if (targetElement.tabIndex === 0 && !isContentEditable) {
    const pressedKey = event.key;

    // Check if Enter key is pressed
    if (pressedKey === 'Enter') {
      return true;
    }

    // Check if Spacebar or ' ' key is pressed and the element's role allows it
    const role = targetElement.getAttribute('role');
    if (
      (pressedKey === ' ' || pressedKey === 'Spacebar') &&
      (role === 'button' ||
        role === 'checkbox' ||
        role === 'combobox' ||
        role === 'menuitem' ||
        role === 'menuitemcheckbox' ||
        role === 'menuitemradio' ||
        role === 'option' ||
        role === 'radio' ||
        role === 'switch' ||
        role === 'tab')
    )
      return true;
  }

  // Default case: return false
  return false;
};

const useTouchEventHandler = (
  targetRef,
  webPressableGroupContextValue,
  callbackFn
) => {
  // const _callbackFn = useDynamicCallbackDANGEROUS(callbackFn);

  useEffect(() => {
    const curr = targetRef.current;
    if (!curr || !curr.addEventListener || !isElementInDocument(curr)) {
      return;
    }
    if (!webPressableGroupContextValue && !isSafariOrMobileSafari) {
      return;
    }
    webPressableGroupContextValue &&
      webPressableGroupContextValue.register(curr, callbackFn);
    const listener = function (a) {
      webPressableGroupContextValue &&
        (a.preventDefault(), webPressableGroupContextValue.onTouchStart());
      if (!isSafariOrMobileSafari) {
        return;
      }

      const documentBody =
        window == null
          ? undefined
          : window.document == null
          ? undefined
          : window.document.body;

      if (documentBody == null) {
        return;
      }

      documentBody.style.WebkitUserSelect = 'none';

      // if (window === undefined || window?.document === undefined) {
      //   return;
      // }

      // var c =
      //   (a = window) == null
      //     ? undefined
      //     : (a = a.document) == null
      //     ? undefined
      //     : a.body
      // if (c == null) return
      // c.style.WebkitUserSelect = 'none'

      // window.document.body.style.webkitUserSelect = 'none';

      var eventOption = passiveEventListenerUtil.makeEventOptions({
        passive: true,
      });

      const touchendListener = () => {
        documentBody.style.WebkitUserSelect = null;

        // @ts-ignore
        // window.document.body.style.webkitUserSelect = null;
        // c.style.WebkitUserSelect = null
        document.removeEventListener('touchend', touchendListener, eventOption);
      };

      document.addEventListener('touchend', touchendListener, eventOption);
    };
    const options = passiveEventListenerUtil.makeEventOptions({
      passive: !webPressableGroupContextValue,
    });
    curr.addEventListener('touchstart', listener, options);
    return function () {
      webPressableGroupContextValue &&
        webPressableGroupContextValue.unRegister(curr);
      curr.removeEventListener('touchstart', listener, options);
    };
  }, [webPressableGroupContextValue, callbackFn, targetRef]);
};

function responseRoleType(type) {
  switch (type) {
    case 'none':
      return 'presentation';
    case 'label':
      return undefined;
    default:
      return type;
  }
}

export const WebPressable = (props) => {
  const targetRef = useRef(null);

  //
  const [focusChangeState, setFocusChangeState] = useState(false);
  const [focusVisibleChangeState, setFocusVisibleChangeState] = useState(false);
  const [hoverChangeState, setHoverChangeState] = useState(false);
  const [pressChangeState, setPressChangeState] = useState(false);

  const webPressableGroupContextValue = useContext(WebPressableGroupContext);

  // TODO add jsdoc
  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    allowClickEventPropagation,
    children,
    className_DEPRECATED,
    disabled,
    forwardedRef,
    link,
    nativeID,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onKeyDown,
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    style,
    suppressFocusRing = false,
    tabbable,
    testOnly_state,
    xstyle,
    ...rest
  } = props;

  const isAllowClickEventPropagation =
    allowClickEventPropagation === undefined
      ? false
      : allowClickEventPropagation;

  const ElementTagComponent = determineElementTag(accessibilityRole, link);

  const _disabled =
    disabled === true ||
    (accessibilityState == null ? undefined : accessibilityState.disabled) ===
      true;

  const ariaHidden =
    accessibilityState == null ? undefined : accessibilityState.hidden;

  const isAnchorTagAndNotDisable =
    ElementTagComponent === 'a' && _disabled !== true;

  const _props = {
    disabled:
      _disabled === true ||
      (testOnly_state == null ? undefined : testOnly_state.disabled) === true ||
      false,
    focusVisible:
      focusVisibleChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.focusVisible) ===
        true,
    focused:
      focusChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.focused) === true,
    hovered:
      hoverChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.hovered) === true,
    pressed:
      pressChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.pressed) === true,
  };

  const _children =
    typeof children === 'function' ? children(_props) : children;

  const _className_DEPRECATED =
    typeof className_DEPRECATED === 'function'
      ? className_DEPRECATED(_props)
      : className_DEPRECATED;

  const _style = typeof style === 'function' ? style(_props) : style;

  const _className = typeof xstyle === 'function' ? xstyle(_props) : xstyle;

  WebPressability.usePressability(targetRef, {
    disabled: _disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange: useChainedCallbacks(setFocusChangeState, onFocusChange),
    onFocusVisibleChange: useChainedCallbacks(
      setFocusVisibleChangeState,
      onFocusVisibleChange
    ),
    onHoverChange: useChainedCallbacks(setHoverChangeState, onHoverChange),
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange: useChainedCallbacks(setPressChangeState, onPressChange),
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault: preventDefault == null ? true : preventDefault,
  });

  const onPressCallBack = useCallback(
    (event) => {
      onPress && onPress(event),
        (onPress || link != null) &&
          isAllowClickEventPropagation !== true &&
          event.stopPropagation(),
        shouldHandleClickEvent(event, preventDefault) &&
          event.nativeEvent.preventDefault();
    },
    [link, onPress, preventDefault]
  );

  const onKeyDownCallBack = useCallback(
    (event) => {
      onKeyDown && onKeyDown(event);
      if (shouldTriggerActionForKeyEvent(event)) {
        const key = event.key;

        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault();
        }
        // (b === ' ' || b === 'Spacebar') && a.preventDefault()
        onPress && (onPress(event), event.stopPropagation());
      }
    },
    [onKeyDown, onPress]
  );

  const cbFunc1Ref = useCallback(
    (node) => {
      targetRef.current = node;

      typeof forwardedRef === 'function'
        ? forwardedRef(node)
        : forwardedRef !== undefined && (forwardedRef.current = node);
    },
    [forwardedRef]
  );

  useTouchEventHandler(
    targetRef,
    webPressableGroupContextValue,
    onPressCallBack
  );

  let _tabIndex = -1;

  // c('gkx')('5403')
  // ? Z !== true && tabbable !== false && (xstyle = 0):
  _disabled !== true &&
    ariaHidden !== true &&
    tabbable !== false &&
    (_tabIndex = 0);

  const linkDownload = link == null ? undefined : link.download;
  const canDownload =
    (linkDownload === true || typeof linkDownload === 'string') &&
    isAnchorTagAndNotDisable;

  return jsx(
    // TODO
    ElementTagComponent === 'a' ? Link : ElementTagComponent,
    Object.assign({}, rest, {
      'aria-activedescendant':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.activedescendant,
      'aria-busy':
        accessibilityState == null ? undefined : accessibilityState.busy,
      'aria-checked':
        accessibilityState == null ? undefined : accessibilityState.checked,
      'aria-controls':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.controls,
      'aria-current':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.current,
      'aria-describedby':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.describedby,
      'aria-details':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.details,
      'aria-disabled': _disabled === true ? _disabled : undefined,
      'aria-errormessage':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.errormessage,
      'aria-expanded':
        accessibilityState == null ? undefined : accessibilityState.expanded,
      'aria-haspopup':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.haspopup,
      'aria-hidden': ariaHidden,
      'aria-invalid':
        accessibilityState == null ? undefined : accessibilityState.invalid,
      'aria-label': accessibilityLabel,
      'aria-labelledby':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.labelledby,
      'aria-modal':
        accessibilityState == null ? undefined : accessibilityState.modal,
      'aria-orientation':
        accessibilityState == null ? undefined : accessibilityState.orientation,
      'aria-owns':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.owns,
      'aria-pressed':
        accessibilityState == null ? undefined : accessibilityState.pressed,
      'aria-readonly':
        accessibilityState == null ? undefined : accessibilityState.readonly,
      'aria-required':
        accessibilityState == null ? undefined : accessibilityState.required,
      'aria-selected':
        accessibilityState == null ? undefined : accessibilityState.selected,
      'aria-valuemax':
        accessibilityValue == null ? undefined : accessibilityValue.max,
      'aria-valuemin':
        accessibilityValue == null ? undefined : accessibilityValue.min,
      'aria-valuenow':
        accessibilityValue == null ? undefined : accessibilityValue.now,
      'aria-valuetext':
        accessibilityValue == null ? undefined : accessibilityValue.text,
      attributionsrc: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.attributionsrc
        : undefined,
      children: _children,
      className: joinClasses(
        stylex.props(
          styles.root,
          _props.disabled && styles.disabled,
          (!_props.focusVisible || suppressFocusRing === true) &&
            styles.focusNotVisible,
          _className,
          webPressableGroupContextValue && styles.rootInGroup
        ).className,
        _className_DEPRECATED

        // classes.root,
        // _props.disabled && classes.disabled,
        // (!_props.focusVisible || suppressFocusRing === true) &&
        //   classes.focusNotVisible,
        // _className,
        // webPressableGroupContextValue && classes.rootInGroup,
        // _className_DEPRECATED
      ),

      'data-testid': undefined,
      download: canDownload ? linkDownload : undefined,
      href: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.url
        : undefined,
      id: nativeID,
      onClick: _disabled ? undefined : onPressCallBack,
      onKeyDown: _disabled ? undefined : onKeyDownCallBack,
      ref: cbFunc1Ref,
      rel: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.rel
        : undefined,
      role: responseRoleType(accessibilityRole),
      style: _style,
      tabIndex: _tabIndex,
      target: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.target
        : undefined,
    })
  );
};
