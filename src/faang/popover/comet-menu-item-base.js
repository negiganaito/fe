/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import { CometNonBreakingSpace, CometTextWithIcon } from "@/faang/common";
import {
  CometMenuContext,
  CometMenuItemBaseRoleContext,
} from "@/faang/context";
import {
  CometFocusGroupFirstLetterNavigation,
  CometMenuFocusGroup,
} from "@/faang/focus";
import { mergeRefs_Legacy } from "@/faang/hooks";
import { CometPressable } from "@/faang/pressable";
import { CometPressableOverlay } from "@/faang/pressable/comet-pressable-overlay";
import { TetraText, TetraTextPairing } from "@/faang/tetra-text";

const styles = stylex.create({
  aux: {
    marginLeft: "12px",
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    minWidth: 0,
  },
  disabled: {
    cursor: "not-allowed",
  },
  extraHorizontalPadding: {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  listItem: {
    alignItems: "center",
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitAppearance: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    marginLeft: "var(--menu-item-base-margin-horizontal)",
    marginRight: "var(--menu-item-base-margin-horizontal)",
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: "var(--menu-item-base-padding-horizontal)",
    paddingRight: "var(--menu-item-base-padding-horizontal)",
    paddingTop: "12px",
    paddingBottom: "12px",
    position: "relative",
    textAlign: "inherit",
    zIndex: 0,
  },
  listItemAlignedCenter: {
    alignItems: "center",
  },
  listItemWithIcon: {
    paddingTop: "8px",
    paddingBottom: "8px",
  },

  dummy1: {
    marginLeft: "12px",
  },
});

// eslint-disable-next-line no-unused-vars
const o = true;

// TODO
export const CometMenuItemBase = forwardRef(
  (
    {
      alignCenter = false,
      autoScrollOnLoad = false,
      aux,
      badge,
      bodyColor,
      bodyText,
      disabled = false,
      download,
      href,
      iconNode,
      id,
      isIconAnImage,
      onClick,
      onFocusIn,
      onFocusOut,
      onHoverIn,
      onHoverOut,
      onPressIn,
      overlayRadius = 4,
      passthroughProps,
      prefetchQueriesOnHover,
      preventClosingMenuOnSelect = false,
      preventLocalNavigation,
      primaryColor,
      primaryText,
      role,
      routeTarget,
      secondaryColor,
      secondaryText,
      target,
      testid,
      traceParams,
      visuallyFocused = false,
      ...rest
    },
    ref
  ) => {
    console.log("CometMenuItemBase");

    const internalRef = useRef(null);
    const cometMenuContextValue = useContext(CometMenuContext);
    const _onClose =
      preventClosingMenuOnSelect !== true && cometMenuContextValue
        ? cometMenuContextValue.onClose
        : null;

    const _linkProps =
      href || routeTarget || target
        ? {
            download,
            passthroughProps,
            prefetchQueriesOnHover,
            preventLocalNavigation,
            routeTarget,
            target,
            traceParams,
            url: href,
          }
        : undefined;

    const onPressCb = useCallback(
      (evt) => {
        _onClose && _onClose();
        onClick && onClick(evt);
      },
      [onClick, _onClose]
    );

    const cometMenuItemBaseRoleContextValue = useContext(
      CometMenuItemBaseRoleContext
    );
    // eslint-disable-next-line no-unused-vars
    let E;
    // const G = role ?? cometMenuItemBaseRoleContextValue;
    const _role = role ?? cometMenuItemBaseRoleContextValue ?? undefined;
    const shouldAutoScrollRef = useRef(autoScrollOnLoad);

    useEffect(() => {
      // const a = T.current

      if (shouldAutoScrollRef.current && internalRef.current) {
        shouldAutoScrollRef.current = false;
        internalRef.current.scrollIntoView({
          block: "nearest",
        });
      }

      // V.current &&
      //   a &&
      //   ((V.current = !1),
      //   a.scrollIntoView({
      //     block: 'nearest',
      //   }))
    }, []);

    const headlineRef = useRef(null);
    const tag =
      CometFocusGroupFirstLetterNavigation.useFirstLetterNavigationTag(
        headlineRef
      );

    const pressableRef = useMemo(() => {
      return mergeRefs_Legacy(ref, internalRef);
    }, [ref]);

    const HeadLine = badge
      ? typeof badge === "number"
        ? jsxs(React.Fragment, {
            children: [
              primaryText,
              jsx(CometNonBreakingSpace, {
                size: 0.5,
              }),
              jsx(TetraText, {
                color: disabled ? "disabled" : primaryColor,
                type: "body4",
                children: badge,
              }),
            ],
          })
        : jsx(CometTextWithIcon, {
            iconAfter: badge,
            children: primaryText,
          })
      : primaryText;

    return jsx(CometMenuFocusGroup.FocusItem, {
      disabled,
      tag,
      children: jsx(CometPressable, {
        ...rest,
        disabled,
        display: "inline",
        id,
        linkProps: _linkProps,
        onFocusIn,
        onFocusOut,
        onHoverIn,
        onHoverOut,
        onPress: onPressCb,
        onPressIn,
        overlayDisabled: true,
        ref: pressableRef,
        role: _role,
        suppressFocusRing: true,
        testid: undefined,
        xstyle: [
          styles.listItem,
          alignCenter && styles.listItemAlignedCenter,
          iconNode && styles.listItemWithIcon,
          disabled && styles.disabled,
          // !o && visuallyFocused && BaseFocusRing.focusRingXStyle,
        ],
        children: ({ focused, focusVisible, hovered, pressed }) => {
          // const b = a.focused,
          //   d = a.focusVisible,
          //   e = a.hovered
          // a = a.pressed
          return jsxs(React.Fragment, {
            // value: (focused && focusVisible) || hovered,
            children: [
              iconNode,
              jsxs("div", {
                className: stylex(
                  styles.content,
                  //  (b = x) != null ? b : !1) &&
                  (isIconAnImage ?? false) && styles.extraHorizontalPadding
                ),
                children: [
                  jsx(TetraTextPairing, {
                    body: bodyText,
                    bodyColor: disabled ? "disabled" : bodyColor,
                    headline: HeadLine,
                    headlineColor: disabled ? "disabled" : primaryColor,
                    headlineRef: headlineRef,
                    level: 4,
                    meta: secondaryText,
                    metaColor: disabled ? "disabled" : secondaryColor,
                    reduceEmphasis: true,
                  }),
                  aux &&
                    jsx("div", {
                      className: styles.dummy1,
                      children: aux,
                    }),
                ],
              }),
              jsx(CometPressableOverlay, {
                focusVisible: focusVisible || visuallyFocused,
                hovered,
                pressed,
                radius: overlayRadius,
                showFocusRing: true,
              }),
            ],
          });
        },
      }),
    });
  }
);
