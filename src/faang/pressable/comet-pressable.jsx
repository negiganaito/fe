/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import stylex from '@stylexjs/stylex';
import React, {
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import { CometDangerouslySuppressInteractiveElementsContext } from '@/faang/context/comet-dangerously-suppress-interactive-elements-context';
import { BaseFocusRing } from '@/faang/focus/base-focus-ring';
import { useMergeRefs } from '@/faang/hooks/use-merge-refs';
import { BaseLink } from '@/faang/link/base-link';
import { CometContainerPressableContext } from '@/faang/pressable/comet-container-pressable-context';
import { BaseButton } from '@/faang/tetra-button/base-button';

import { CometPressableOverlay } from './comet-pressable-overlay';

//  n = c("gkx")("1721477") || c("gkx")("1459")
const n = true;

const styles = stylex.create({
  defaultCursor: {
    cursor: 'default',
  },

  expanding: {
    display: 'flex',
  },

  hideOutline: {
    outlineStyle: 'none',
  },

  linkBase: {
    display: 'inline-block',
  },

  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':hover': {
      textDecorationLine: 'none',
    },
    borderRadius: 'inherit',
    display: 'inline-flex',
    flexDirection: 'row',

    userSelect: 'none',
  },

  // eslint-disable-next-line camelcase
  root_DEPRECATED: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':hover': {
      textDecorationLine: 'none',
    },
    borderRadius: 'inherit',
    position: 'relative',

    userSelect: 'none',
  },

  zIndex: {
    zIndex: 1,
  },
});

export const CometPressable = forwardRef(
  (
    {
      allowClickEventPropagation,
      children,
      xstyle,
      className_DEPRECATED,
      cursorDisabled,
      display = 'block',
      expanding = 'block',
      hideFocusOverlay = false,
      hideHoverOverlay = false,
      disabled = false,
      isContainerTarget = false,
      linkProps,
      onFocusChange,
      onFocusIn,
      onFocusOut,
      onFocusVisibleChange,
      onHoverChange,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressChange,
      onPressIn,
      onPressOut,
      overlayDisabled = false,
      overlayFocusRingPosition,
      overlayFocusVisibleStyle,
      overlayHoveredStyle,
      overlayOffset,
      overlayPressedStyle,
      overlayRadius,
      preventContextMenu,
      suppressFocusRing = false,
      testOnly_pressed = false,
      testid,
      onContextMenu,
      ...rest
    },
    externalRef
  ) => {
    const [pressedState, setPressed] = useState(testOnly_pressed);
    const [focusedState, setFocused] = useState(false);
    const [focusVisibleState, setFocusVisible] = useState(false);
    const [hoveredState, setHovered] = useState(false);

    const onPressChangeCb = useCallback(
      (e) => {
        setPressed(e || testOnly_pressed);
        onPressChange && onPressChange(e);
      },
      [onPressChange, testOnly_pressed]
    );

    const onFocusChangeCb = useCallback(
      (e) => {
        setFocused(e);
        onFocusChange && onFocusChange(e);
      },
      [onFocusChange]
    );

    const onFocusVisibleChangeCb = useCallback(
      (e) => {
        setFocusVisible(e);
        onFocusVisibleChange && onFocusVisibleChange(e);
      },
      [onFocusVisibleChange]
    );

    const onHoverChangeCb = useCallback(
      (e) => {
        setHovered(e);
        onHoverChange && onHoverChange(e);
      },
      [onHoverChange]
    );

    const overlay = overlayDisabled ? undefined : (
      <CometPressableOverlay
        focusRingPosition={overlayFocusRingPosition}
        focusVisible={!hideFocusOverlay && focusVisibleState}
        focusVisibleStyle={overlayFocusVisibleStyle}
        hovered={!hideHoverOverlay && hoveredState}
        hoveredStyle={overlayHoveredStyle}
        offset={overlayOffset}
        pressed={pressedState}
        pressedStyle={overlayPressedStyle}
        radius={overlayRadius}
        showFocusRing={true}
      />
    );

    const _children =
      typeof children === 'function' ? (
        children({
          disabled,
          focusVisible: focusVisibleState,
          focused: focusedState,
          hovered: hoveredState,
          overlay,
          pressed: pressedState,
        })
      ) : (
        <>
          {children}
          {overlay}
        </>
      );

    const _classNameWith =
      typeof xstyle === 'function'
        ? xstyle({
          disabled,
          focusVisible: focusVisibleState,
          focused: focusedState,
          hovered: hoveredState,
          pressed: pressedState,
        })
        : xstyle;

    // overlayHoveredStyle =
    //     typeof xstyle === 'function'
    //       ? xstyle({
    //           disabled: disabled,
    //           focused: focusedState,
    //           focusVisible: focusVisibleState,
    //           hovered: hoveredState,
    //           pressed: pressedState,
    //         })
    //       : xstyle

    const cometContainerPressableContextValue = useContext(
      CometContainerPressableContext
    );

    // eslint-disable-next-line no-unused-vars
    const cometDangerouslySuppressInteractiveElementsContextValue = useContext(
      CometDangerouslySuppressInteractiveElementsContext
    );

    const _suppressFocusRing =
      focusVisibleState &&
      (hideFocusOverlay || overlayDisabled) &&
      !suppressFocusRing;

    const _className = [
      display === 'inline' ? styles.root_DEPRECATED : styles.root,
      cursorDisabled === true && styles.defaultCursor,
      expanding && styles.expanding,
      linkProps !== undefined && styles.linkBase,
      !focusVisibleState && styles.hideOutline,
      overlayHoveredStyle,
      //
      _classNameWith,
      _suppressFocusRing &&
      (overlayFocusRingPosition === 'inset'
        ? BaseFocusRing.focusRingInsetXStyle
        : BaseFocusRing.focusRingXStyle),
      cometContainerPressableContextValue !== undefined && styles.zIndex,
    ];

    // const _className = mergeClasses(
    //   display === 'inline' ? classes.root_DEPRECATED : classes.root,
    //   cursorDisabled === true && classes.defaultCursor,
    //   expanding && classes.expanding,
    //   linkProps !== undefined && classes.linkBase,
    //   !focusVisibleState && classes.hideOutline,
    //   overlayHoveredStyle,
    //   //
    //   _classNameWith,
    //   _suppressFocusRing &&
    //     (overlayFocusRingPosition === 'inset'
    //       ? classes.focusRingInsetXStyle
    //       : classes.focusRingXStyle),
    //   cometContainerPressableContextValue !== undefined && classes.zIndex
    // );

    const _props = {
      onBlur: onFocusOut,
      onClick: onPress,
      onFocus: onFocusIn,
      onFocusChange: onFocusChangeCb,
      onFocusVisibleChange: onFocusVisibleChangeCb,
      onHoverChange: onHoverChangeCb,
      onHoverEnd: onHoverOut,
      onHoverStart: onHoverIn,
      onPressChange: onPressChangeCb,
      onPressEnd: onPressOut,
      onPressStart: onPressIn,
    };

    // eslint-disable-next-line no-unused-vars
    const ga = useRef(null);
    const internalRef = useRef(null);

    // useEffect(() => {
    //   if (isContainerTarget && cometContainerPressableContextValue) {
    //     // @ts-ignore
    //     cometContainerPressableContextValue.onMount(
    //       {
    //         onContextMenu: (e) => {
    //           preventContextMenu === true && e.preventDefault()
    //           onContextMenu !== undefined && onContextMenu(e)
    //         },
    //         onPress: () => {
    //           internalRef.current && internalRef.current.click()
    //         },
    //         target: !linkProps ? undefined : linkProps.target,
    //         url: !linkProps ? undefined : linkProps.url,
    //       },
    //       ga,
    //     )
    //   }
    // }, [
    //   cometContainerPressableContextValue,
    //   isContainerTarget,
    //   testOnly_pressed,
    //   onContextMenu,
    //   preventContextMenu,
    //   !linkProps ? undefined : linkProps.url,
    //   !linkProps ? undefined : linkProps.target,
    // ])

    const ref = useMergeRefs(externalRef, internalRef);

    // TODO
    // if (cometDangerouslySuppressInteractiveElementsContextValue) {
    //   const comp = display === 'inline' ? 'span' : 'div'
    //   return jsx(
    //     comp,
    //     babelHelpers['extends'](
    //       {
    //         className_DEPRECATED: className_DEPRECATED,
    //         display: display === 'inline' ? display : 'block',
    //         preventContextMenu: preventContextMenu,
    //       },
    //       testOnly_pressed,
    //       {
    //         className: c('stylex')(overlayRadius),
    //         'data-testid': undefined,
    //         ref: overlayFocusVisibleStyle,
    //         children: hideHoverOverlay,
    //       },
    //     ),
    //   )
    // }

    if (linkProps) {
      const { url, ...restLinkProps } = linkProps;

      const baseLinkProps = Object.assign({}, restLinkProps, {
        href: url,
      });

      return (
        <BaseLink
          {..._props}
          onContextMenu={onContextMenu}
          {...rest}
          {...baseLinkProps}
          className_DEPRECATED={className_DEPRECATED}
          disabled={disabled}
          display={display === 'inline' ? display : 'block'}
          preventContextMenu={preventContextMenu}
          ref={ref}
          suppressFocusRing={!_suppressFocusRing || n}
          testid={undefined}
          xstyle={_className}
          // eslint-disable-next-line react/no-children-prop
          children={_children}
        />
      );
    }

    return (
      <BaseButton
        {..._props}
        {...rest}
        allowClickEventPropagation={allowClickEventPropagation}
        className_DEPRECATED={className_DEPRECATED}
        disabled={disabled}
        display={display === 'inline' ? display : 'block'}
        preventContextMenu={preventContextMenu}
        ref={ref}
        suppressFocusRing={!_suppressFocusRing || n}
        testid={undefined}
        xstyle={_className}
        // eslint-disable-next-line react/no-children-prop
        children={_children}
      />
    );
  }
);

CometPressable.displayName = 'CometPressable.react';
