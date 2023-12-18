import stylex from '@stylexjs/stylex';
import UserAgent from 'fbjs/lib/UserAgent';
import joinClasses from 'fbjs/lib/joinClasses';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { jsx } from 'react/jsx-runtime';

import { WebPressableGroupContext } from '@/faang/context/web-pressable-group-context';

import { useMergeRefs } from '@/faang/hooks/merge-refs';

import { passiveEventListenerUtil } from '@/faang/react-interactions/passive-event-listener-util';
import { WebPressability } from '@/faang/react-interactions/web-pressability';

const styles = stylex.create({
  disabled: {
    cursor: 'not-allowed',
  },
  focusNotVisible: {
    outlineStyle: 'none',
  },
  notSelectable: {
    userSelect: 'none',
  },
  root: {
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    border: '0',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    touchAction: 'manipulation',
  },
  rootInGroup: {
    touchAction: 'none',
  },

  linkFocusRingXStyle: {
    // "var(--base-blue) auto 2px
    outline: '2px auto var(--base-blue)',
  },
});

const gkx5403 = false;

const isSafari =
  UserAgent.isBrowser('Safari') || UserAgent.isBrowser('Mobile Safari');

export function PressableText(props) {
  const bRef = useRef(null);

  const [focused, setFocusedChange] = useState(false);
  const [focusVisible, setFocusVisibleChange] = useState(false);
  const [hoverr, setHoverChange] = useState(false);
  const [presss, setPressChange] = useState(false);

  const pressableGroupContextValue = useContext(WebPressableGroupContext);

  // TODO
  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    children,
    className_DEPRECATED,
    direction,
    disabled,
    focusable,
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
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    selectable,
    style,
    suppressFocusRing,
    testOnly_state,
    xstyle,
    ...rest
  } = props;

  const ElementComponent = determineTagBasedOnAccessibilityRoleAndLink(
    accessibilityRole,
    link
  );

  const _disabled =
    disabled === true ||
    (accessibilityState == null ? undefined : accessibilityState.disabled) ===
    true;

  const ariaHidden =
    accessibilityState == null ? undefined : accessibilityState.hidden;

  const anchorTagAndNotDisable = ElementComponent === 'a' && disabled !== true;

  const _props = {
    disabled:
      _disabled === true ||
      (testOnly_state == null ? undefined : testOnly_state.disabled) === true ||
      false,
    focused:
      focused ||
      (testOnly_state == null ? undefined : testOnly_state.focused) === true,
    focusVisible:
      (focusVisible && suppressFocusRing !== true) ||
      (testOnly_state == null ? undefined : testOnly_state.focusVisible) ===
      true,
    hovered:
      hoverr ||
      (testOnly_state == null ? undefined : testOnly_state.hovered) === true,
    pressed:
      presss ||
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

  WebPressability.usePressability(bRef, {
    disabled: _disabled,
    onBlur: onBlur,
    onContextMenu: onContextMenu,
    onFocus: onFocus,
    onFocusChange: useCombinedCallbacks(setFocusedChange, onFocusChange),
    onFocusVisibleChange: useCombinedCallbacks(
      setFocusVisibleChange,
      onFocusVisibleChange
    ),
    onHoverChange: useCombinedCallbacks(setHoverChange, onHoverChange),
    onHoverEnd: onHoverEnd,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverStart,
    onPressChange: useCombinedCallbacks(setPressChange, onPressChange),
    onPressEnd: onPressEnd,
    onPressMove: onPressMove,
    onPressStart: onPressStart,
    preventContextMenu: preventContextMenu,
    preventDefault: preventDefault == null ? true : preventDefault,
  });

  const onClickCbFunc = useCallback(
    function (event) {
      onPress && onPress(event),
        (onPress || link != null) && event.stopPropagation(),
        handleClickEventAndPreventDefault(event, preventDefault) &&
        event.nativeEvent.preventDefault();
    },
    [link, onPress, preventDefault]
  );

  const onKeyDownCbFunc = useCallback(
    function (event) {
      if (shouldTriggerActionOnEvent(event)) {
        var key = event.key;

        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault();
        }

        // ;(b === ' ' || b === 'Spacebar') && event.preventDefault()
        // onPress && (onPress(event), event.stopPropagation())

        if (onPress) {
          onPress(event);
          event.stopPropagation();
        }
      }
    },
    [onPress]
  );

  // var ja,

  let Z;
  switch (direction) {
    case 'none':
      break;
    default:
      direction != null && (Z = direction);
      break;
  }

  const mergeRef = useMergeRefs(bRef, forwardedRef);

  vFuncHooks(bRef, pressableGroupContextValue, onClickCbFunc);

  var tabIndexValue;
  const anchorTagOrButtonRole =
    ElementComponent === 'a' || accessibilityRole === 'button';

  anchorTagOrButtonRole
    ? ariaHidden === true ||
      focusable === false ||
      (!gkx5403 && _disabled === true)
      ? (tabIndexValue = -1)
      : (tabIndexValue = 0)
    : gkx5403
      ? ariaHidden !== true &&
      focusable !== false &&
      accessibilityRole !== 'none' &&
      (tabIndexValue = 0)
      : _disabled !== true &&
      ariaHidden !== true &&
      focusable !== false &&
      accessibilityRole !== 'none' &&
      (tabIndexValue = 0);

  const linkDownload = link == null ? undefined : link.download;
  const canDownload =
    (linkDownload === true || typeof linkDownload === 'string') &&
    anchorTagAndNotDisable;
  const ariaDisable =
    accessibilityRole === 'none' ? 'presentation' : accessibilityRole;

  return jsx(
    ElementComponent,
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
      'aria-disabled':
        _disabled === true && ariaDisable !== 'presentation'
          ? _disabled
          : undefined,
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
      attributionsrc: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.attributionsrc
        : undefined,
      children: _children,
      className: joinClasses(
        stylex.props(
          styles.root,
          selectable === false && styles.notSelectable,
          _props.disabled && styles.disabled,
          !_props.focusVisible && styles.focusNotVisible,
          _props.focusVisible &&
          anchorTagOrButtonRole &&
          styles.linkFocusRingXStyle,
          _className,
          pressableGroupContextValue && styles.rootInGroup
        ).className,
        _className_DEPRECATED
      ),

      // className: mergeClasses(
      //   classes.root,
      //   selectable === false && classes.notSelectable,
      //   _props.disabled && classes.disabled,
      //   !_props.focusVisible && classes.focusNotVisible,
      //   _props.focusVisible &&
      //     anchorTagOrButtonRole &&
      //     classes.linkFocusRingXStyle,
      //   _className,
      //   pressableGroupContextValue && classes.rootInGroup,
      //   _className_DEPRECATED
      // ),
      'data-testid': undefined,
      dir: Z,
      download: canDownload ? linkDownload : undefined,
      href: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.url
        : undefined,
      id: nativeID,
      onClick: _disabled ? undefined : onClickCbFunc,
      onKeyDown: _disabled ? undefined : onKeyDownCbFunc,
      ref: mergeRef,
      rel: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.rel
        : undefined,
      role: ariaDisable,
      style: _style,
      tabIndex: tabIndexValue,
      target: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.target
        : undefined,
    })
  );
}

const tabArr = ['menuitem', 'tab', 'none'];

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

function determineTagBasedOnAccessibilityRoleAndLink(accessibilityRole, link) {
  var tag = 'div';
  if (
    ((link == null ? undefined : link.url) != null &&
      (link == null ? undefined : link.url) !== '#') ||
    (tabArr.includes(accessibilityRole) &&
      (link == null ? undefined : link.url) != null)
  )
    tag = 'a';
  else if (accessibilityRole != null) {
    link = specialElements[accessibilityRole];
    link != null && (tag = link);
  }
  return tag;
}

function useCombinedCallbacks(cb1, cb2) {
  return useCallback(
    function (params) {
      cb1(params);
      cb2 && cb2(params);
    },
    [cb2, cb1]
  );
}

function handleClickEventAndPreventDefault(event, preventDefault) {
  var altKey = event.altKey,
    ctrlKey = event.ctrlKey,
    currentTarget = event.currentTarget,
    metaKey = event.metaKey,
    shiftKey = event.shiftKey;

  const target = event.target;

  // var i = target
  // c('justknobx')._('450') && (i = sFunc(a) ? a : f)
  const node = isElementInDocument(target) ? target : currentTarget;
  const _isElementOrAncestorLink = isElementOrAncestorLink(node);
  const isCoreKey = altKey || ctrlKey || metaKey || shiftKey;
  return preventDefault !== false && _isElementOrAncestorLink && !isCoreKey;
}

function isElementInDocument(node) {
  return typeof document !== 'undefined' &&
    typeof document.contains === 'function'
    ? document.contains(node)
    : false;
}

function isElementOrAncestorLink(el) {
  // eslint-disable-next-line no-self-assign
  el = el;
  while (el != null) {
    if (el.tagName === 'A' && el.href != null) return true;
    el = el.parentNode;
  }
  return false;
}

const shouldTriggerActionOnEvent = function (event) {
  var target = event.target,
    tagName = target.tagName;
  const isNeedTagName =
    target.isContentEditable ||
    (tagName === 'A' && target.href != null) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA';
  if (target.tabIndex === 0 && !isNeedTagName) {
    const key = event.key;
    if (key === 'Enter') {
      return true;
    }
    const role = target.getAttribute('role');
    if (
      (key === ' ' || key === 'Spacebar') &&
      (role === 'button' ||
        role === 'combobox' ||
        role === 'menuitem' ||
        role === 'menuitemradio' ||
        role === 'option')
    )
      return true;
  }
  return false;
};

var vFuncHooks =
  // (e = b('cr:7332')) != null
  //   ? e
  //   :
  function (ref, pressableGroupContextValue, cbFunc) {
    useEffect(
      function () {
        var e,
          f = ref.current,
          g =
            (e = window) == null
              ? undefined
              : (e = e.document) == null
                ? undefined
                : e.body;
        if (
          g == null ||
          f == null ||
          !isElementInDocument(f) ||
          f.addEventListener == null
        )
          return;
        pressableGroupContextValue &&
          pressableGroupContextValue.register(f, cbFunc);
        var h = function (a) {
          pressableGroupContextValue &&
            (a.preventDefault(), pressableGroupContextValue.onTouchStart());
          if (!isSafari) {
            return;
          }
          if (g == null) return;
          g.style.WebkitUserSelect = 'none';
          var c = passiveEventListenerUtil.makeEventOptions({
            passive: true,
          });
          a = function a() {
            g.style.WebkitUserSelect = null;
            document.removeEventListener('touchend', a, c);
          };
          document.addEventListener('touchend', a, c);
        },
          i = passiveEventListenerUtil.makeEventOptions({
            passive: !pressableGroupContextValue,
          });
        f.addEventListener('touchstart', h, i);
        return function () {
          pressableGroupContextValue &&
            pressableGroupContextValue.unRegister(f),
            f.removeEventListener('touchstart', h, i);
        };
      },
      [pressableGroupContextValue, cbFunc, ref]
    );
  };
