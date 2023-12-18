/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

/* eslint-disable camelcase */
import React, { forwardRef, useContext, useMemo, useRef } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

import { BaseLinkNestedPressableContext } from '@/faang/context/base-link-nested-pressable-context';
import { mergeRefs } from '@/faang/hooks/merge-refs';
import { BaseNestedPressableHack_DO_NOT_USE } from '@/faang/pressable/base-nested-pressable-hack_DO_NOT_USE';
import { Pressable } from '@/faang/pressable/pressable';
import { PressableText } from '@/faang/pressable/pressable-text';

// NOTE some potential bug

export const BaseLink = forwardRef(
  (
    {
      href,
      xstyle,
      color,
      suppressFocusRing,
      focusable,
      children,
      disabled,
      display = 'inline',
      label,
      onBlur,
      onClick,
      onContextMenu,
      onFocus,
      onFocusChange,
      suppressHydrationWarning,
      target,
      testOnly_pressed = false,
      traceParams,
      attributionsrc,
      className_DEPRECATED,
      disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      download,
      fbclid,
      id,
      lynxMode,
      onHoverEnd,
      onHoverStart,
      onHoverChange,
      onPressChange,
      onPressStart,
      onPressEnd,
      onNavigate,
      passthroughProps,
      prefetchQueriesOnHover,
      preloadCodeOnMount,
      preserveQueryInShim,
      preventContextMenu,
      preventLocalNavigation,
      productAttribution,
      routeTarget,
      testid,
      role,
      rel,
      style,
      onFocusVisibleChange,
      ...props
    },
    externalRef
  ) => {
    // return <Link href={href} className={className} {...props} ref={ref} />

    const internalRef = useRef(null);

    const {
      'aria-activedescendant': ariaActivedescendant,
      'aria-checked': ariaChecked,
      'aria-controls': ariaControls,
      'aria-current': ariaCurrent,
      'aria-describedby': ariaDescribedly,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-hidden': ariaHidden,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-owns': ariaOwns,
      'aria-selected': ariaSelected,
    } = props;

    const baseLinkNestedPressableValue = useContext(
      BaseLinkNestedPressableContext
    );

    const ref = useMemo(
      () => mergeRefs(externalRef, internalRef),
      [externalRef, internalRef]
    );

    const _role = role === 'presentation' ? 'none' : role;
    const _accessibilityLabel =
      label !== undefined && _role !== 'none' ? label : ariaLabel;

    const allProps = {
      accessibilityLabel: _accessibilityLabel,
      accessibilityRelationship: {
        activedescendant: ariaActivedescendant,
        controls: ariaControls,
        current: ariaCurrent,
        describedby: ariaDescribedly,
        haspopup: ariaHaspopup,
        labelledby: ariaLabelledby,
        owns: ariaOwns,
      },
      accessibilityState: {
        checked: ariaChecked,
        disabled: disabled,
        expanded: ariaExpanded,
        hidden: ariaHidden,
        invalid: ariaInvalid,
        selected: ariaSelected,
      },
      className_DEPRECATED,
      disabled,
      forwardedRef: ref,
      link: {
        // TODO
        attributionsrc: attributionsrc ?? 'T',
        download,
        rel,
        target,
        url: href,
      },
      nativeID: id,
      onBlur,
      onContextMenu,
      onFocus,
      onFocusChange,
      onFocusVisibleChange,
      onHoverChange,
      onHoverEnd,
      onHoverStart,
      onPress: onClick,
      onPressChange,
      onPressEnd,
      onPressStart,
      preventContextMenu,
      preventDefault: target !== '_blank',
      style,
      suppressHydrationWarning:
        suppressHydrationWarning === true ? true : undefined,
      testID: testid,
      testOnly_state: {
        disabled: false,
        focusVisible: false,
        focused: false,
        hovered: false,
        pressed: testOnly_pressed,
      },
      xstyle,
    };

    let _child;

    if (display === 'block') {
      const nestedAccessibilityRole =
        _role === 'button' ||
          _role === 'menuitem' ||
          _role === 'none' ||
          _role === 'switch' ||
          _role === 'checkbox' ||
          _role === 'article' ||
          _role === 'radio' ||
          _role === 'tab'
          ? _role
          : 'link';

      _child = (
        <Pressable
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          suppressFocusRing={suppressFocusRing}
          tabbable={focusable}
        >
          <BaseLinkNestedPressableContext.Provider value={true}>
            {children}
          </BaseLinkNestedPressableContext.Provider>
        </Pressable>
      );
    } else {
      const nestedAccessibilityRole =
        _role === 'button' ||
          _role === 'menuitem' ||
          _role === 'menuitemradio' ||
          _role === 'menuitemcheckbox' ||
          _role === 'none' ||
          _role === 'tab'
          ? _role
          : 'link';

      _child = (
        <PressableText
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          direction="none"
          focusable={focusable}
          suppressFocusRing={suppressFocusRing}
        >
          <BaseLinkNestedPressableContext.Provider value={true}>
            {children}
          </BaseLinkNestedPressableContext.Provider>
        </PressableText>
      );
    }

    return jsxs(React.Fragment, {
      children: [
        // routeTarget === 'content' && jsx(m, {}),
        baseLinkNestedPressableValue
          ? jsx(BaseNestedPressableHack_DO_NOT_USE, {
            children: _child,
          })
          : _child,
      ],
    });
  }
);

// function m() {
//   var a = c('useCurrentRoute')();
//   const b = c('useCometErrorProject')();
//   return (
//     a != null &&
//     a.isCometRootContainer !== !0 &&
//     jsx(c('RecoverableViolationWithComponentStack.react'), {
//       errorMessage:
//         'A link with target=content was rendered in a non-tab-container',
//       projectName: (a = b) != null ? a : 'comet_infra',
//     })
//   );
// }
