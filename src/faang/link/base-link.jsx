/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
'use client';

/* eslint-disable camelcase */
import React, { forwardRef, useMemo, useRef } from 'react';

import { Pressable } from '@/faang/pressable/pressable';
import { PressableText } from '@/faang/pressable/pressable-text';

import { mergeRefs } from '@/faang/hooks/merge-refs';

const BaseLink = forwardRef(
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
        focused: false,
        focusVisible: false,
        hovered: false,
        pressed: testOnly_pressed,
      },
      xstyle,
    };

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

      return (
        <Pressable
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          suppressFocusRing={suppressFocusRing}
          tabbable={focusable}
        >
          {children}
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

      return (
        <PressableText
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          direction="none"
          focusable={focusable}
          suppressFocusRing={suppressFocusRing}
        >
          {children}
        </PressableText>
      );
    }
  }
);

export default BaseLink;
