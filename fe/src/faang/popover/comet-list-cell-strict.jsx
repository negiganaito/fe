/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, useContext } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";

import {
  CometCompositeStructureContext,
  CometDensityAwarenessContext,
  CometFocusGroupContext,
  CometFocusTableContext,
} from "@/faang/context";
import { CometIcon } from "@/faang/icon";
import { CometPressable } from "@/faang/pressable";
import {
  CometDensityModeContext,
  TetraText,
  TetraTextPairing,
} from "@/faang/tetra-text";

import { getItemRoleFromCompositeRole } from "./get-item-role-from-composite-role";
import { getListCellAddOn } from "./get-list-cell-add-on";

const styles = stylex.create({
  addOn: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  addOnWithExpander: {
    marginRight: "8px",
  },
  addOnWithIcon: {
    display: "flex",
  },
  addOnWithText: {
    marginLeft: "4px",
  },
  bottomAddOn: {
    display: "flex",
    flexDirection: "column",
    marginEnd: "-12px",
    marginStart: "-12px",
  },
  bottomAddOnInner: {
    maxWidth: "100%",
  },
  bottomAddOnOverrideRow: {
    flexDirection: "row",
    marginRight: "0",
    marginLeft: "0",
    paddingTop: "6px",
  },
  bottomAddOnWithFacepile: {
    marginLeft: "-16px",
  },
  bottomDivider: {
    backgroundColor: "var(--divider)",
    bottom: "0",
    right: "0",
    height: "1px",
    position: "absolute",
    left: "0",
  },
  content: {
    alignItems: "stretch",
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "0px",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-between",
    margin: "0",

    minHeight: "0",
    minWidth: "0",
    padding: "12px 0",

    position: "relative",
    zIndex: "0",
  },
  contentContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    flexGrow: "1",
    flexShrink: "1",
    justifyContent: "space-between",
    marginBottom: "0",
    marginRight: "0",
    marginLeft: "0",
    marginTop: "0",
    minHeight: "0",
    minWidth: "0",
    paddingBottom: "0",
    paddingRight: "0",
    paddingLeft: "0",
    paddingTop: "0",
    position: "relative",
    zIndex: "0",
  },
  contentDense: {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  contentWithMoreSpacing: {
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  contentWithMoreSpacingDense: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  disabled: {
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  endAddOn: {
    marginBottom: "12px",
    marginLeft: "12px",
    marginTop: "12px",
    position: "relative",
  },
  endAddOnCenter: {
    marginBottom: "8px",
    marginTop: "8px",
  },
  endAddOnSmall: {
    marginBottom: "8px",
    marginLeft: "12px",
    marginTop: "8px",
    position: "relative",
  },
  listCellMinHeight: {
    minHeight: "44px",
  },
  pressable: {
    borderRadius: "8px",

    display: "block",
  },
  responsiveButtons: {
    flexGrow: "1",
    paddingBottom: "6px",
    paddingTop: "6px",
  },
  responsiveContent: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "-6px",
    marginTop: "-6px",
  },
  responsiveText: {
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    maxWidth: "100%",
    minWidth: "50%",
    paddingBottom: "6px",
    paddingRight: "16px",
    paddingTop: "6px",
  },
  root: {
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-between",
    marginBottom: "0",
    marginRight: "0",
    marginLeft: "0",
    marginTop: "0",
    minHeight: "0",
    minWidth: "0",
    paddingBottom: "0",
    paddingRight: "8px",
    paddingLeft: "8px",
    paddingTop: "0",
    position: "relative",
    zIndex: "0",
  },
  rootWithIncreasedHeight: {
    minHeight: "52px",
  },
  selected: {
    backgroundColor: "var(--hosted-view-selected-state)",
  },
  selectedWashBackground: {
    backgroundColor: "var(--background-deemphasized)",
  },
  startAddOn: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "column",
    marginRight: "12px",
    marginTop: "8px",
    marginBottom: "8px",
    position: "relative",
  },
  startAddOnDense: {
    marginTop: "6px",
    marginBottom: "6px",
  },
  startAddOnDensityAware: {
    // eslint-disable-next-line @stylexjs/valid-styles
    "@media (max-height: 700px)": {
      marginRight: "6px",
      marginLeft: "-4px",
      marginTop: "4px",
      marginBottom: "4px",
      transform: "scale(.77777777)",
    },
  },
  textRight: {
    flexShrink: "0",
  },
  visualSwitch: {
    pointerEvents: "none",
  },
});

const dummyStyles = stylex.create({
  dummy1: {
    alignItems: "center",
    alignSelf: "stretch",
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-between",
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    minHeight: 0,
    minWidth: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    position: "relative",
    zIndex: 0,
  },

  dummy2: {
    maxWidth: "100%",
  },

  dummy3: {
    backgroundColor: "var(--divider)",
    bottom: 0,
    right: 0,
    height: "1px",
    position: "absolute",
    left: 0,
  },

  dummy4: {
    flexShrink: 0,
  },
});

const startVerticalAlignStyles = stylex.create({
  center: {
    alignSelf: "center",
  },
  top: {
    alignSelf: "flex-start",
  },
});

const endVerticalAlignStyles = stylex.create({
  center: {
    alignSelf: "center",
  },
  top: {
    alignSelf: "flex-start",
  },
});

// eslint-disable-next-line no-unused-vars
export const CometListCellStrict = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      addOnBottom,
      addOnEnd,
      addOnEndDisabled,
      addOnEndRef,
      addOnEndTestId,
      addOnEndVerticalAlign = "top",
      addOnStart,
      addOnStartCssSelectionId,
      addOnStartDisabled,
      addOnStartOverrideVerticalStyle,
      addOnStartTestId,
      addOnStartVerticalAlign = "top",
      "aria-label": ariaLabel,
      "aria-pressed": ariaPressed,
      body,
      bodyColor = "secondary",
      bodyLineLimit,
      contentHorizontalPadding,
      dataAttributes,
      describedby,
      disabled = false,
      emphasized = false,
      focusable,
      hasBottomDivider,
      headline,
      headlineColor = "primary",
      headlineAddOn,
      headlineLineLimit,
      level = 3,
      linkProps,
      meta,
      metaColor = "tertiary",
      metaLineLimit,
      metaLocation,
      onFocusChange,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressIn,
      onPressOut,
      paddingHorizontal,
      role,
      selected = false,
      selectedBackground,
      size = "default",
      testid,
      testOnly_pressed,
    },
    ref
  ) => {
    let disabledInternal = disabled;
    let onPressInternal = onPress;

    if (!onPress && (!addOnEnd ? undefined : addOnEnd.type) === "switch") {
      onPressInternal = (!addOnEnd ? undefined : addOnEnd.onChange)
        ? addOnEnd.onChange
        : onPress;
      disabledInternal = (!addOnEnd ? undefined : addOnEnd.disabled)
        ? addOnEnd.disabled
        : disabled;
    }

    const cometDensityModeValue = useContext(CometDensityModeContext);
    const densityMode = cometDensityModeValue[0];
    const cometDensityAwarenessContextValue = useContext(
      CometDensityAwarenessContext
    );

    const onlyHeadline = headline && !body && !meta;
    const onlyBody = !headline && body && !meta;
    const onlyMeta = !headline && !body && meta;
    const Z =
      (onlyHeadline && headlineLineLimit && headlineLineLimit === 1) ||
      (onlyBody && bodyLineLimit && bodyLineLimit === 1) ||
      (onlyMeta && metaLineLimit && metaLineLimit === 1);

    const multipleLinesLimitExceeded =
      (onlyHeadline && headlineLineLimit && headlineLineLimit > 1) ||
      (onlyBody && bodyLineLimit && bodyLineLimit > 1) ||
      (onlyMeta && metaLineLimit && metaLineLimit > 1);

    const addOnEndButtonTypeIs_primary_secondary_body =
      addOnEnd &&
      (addOnEnd.type === "primary-button" ||
        addOnEnd.type === "secondary-button" ||
        addOnEnd.type === "body");

    const addOnEndIsExpander = addOnEnd && addOnEnd.type === "expander";

    const p =
      addOnEndButtonTypeIs_primary_secondary_body || addOnEndIsExpander
        ? "center"
        : addOnEndVerticalAlign;
    const u = Z ? "center" : addOnStartVerticalAlign;
    let addOnBottomTypeIsButton = addOnBottom && addOnBottom.type === "buttons";

    const variableMakeMeConfused =
      !addOnStart &&
      (multipleLinesLimitExceeded ||
        (Z &&
          (addOnEndButtonTypeIs_primary_secondary_body || addOnEndIsExpander)));

    const dataAttrValue = dataAttributes
      ? Object.keys(dataAttributes).reduce((a, b) => {
          a !== null && b !== null && (a["data-" + b] = dataAttributes[b]);
          return a;
        }, {})
      : null;

    let _children = jsxs("div", {
      className: stylex(
        styles.root,
        addOnEndIsExpander &&
          size !== "small" &&
          styles.rootWithIncreasedHeight,
        size !== "small" && styles.listCellMinHeight
      ),
      style: !contentHorizontalPadding
        ? undefined
        : {
            paddingLeft: contentHorizontalPadding,
            paddingRight: contentHorizontalPadding,
          },
      children: [
        addOnStart
          ? jsx("div", {
              className: stylex(
                styles.startAddOn,
                addOnStartOverrideVerticalStyle,
                // @ts-ignore
                startVerticalAlignStyles[u],
                densityMode && styles.startAddOnDense,
                cometDensityAwarenessContextValue &&
                  styles.startAddOnDensityAware
              ),
              "data-testid": undefined,
              id: addOnStartCssSelectionId,
              children: jsx(AddOnStartComp, {
                addOnStart,
                disabled: addOnStartDisabled ?? disabledInternal, // (A = s) != null ? A : a,
              }),
            })
          : null,
        jsxs("div", {
          className: stylex(dummyStyles.dummy1),
          children: [
            jsxs("div", {
              className: stylex(
                styles.content,
                densityMode && styles.contentDense,
                variableMakeMeConfused && styles.contentWithMoreSpacing,
                variableMakeMeConfused &&
                  densityMode &&
                  styles.contentWithMoreSpacingDense,
                addOnBottomTypeIsButton && styles.responsiveContent
              ),
              children: [
                jsx("div", {
                  className: stylex(
                    addOnBottomTypeIsButton && styles.responsiveText
                  ),
                  children: jsx(TetraTextPairing, {
                    body,
                    bodyColor: disabledInternal ? "disabled" : bodyColor,
                    bodyLineLimit,
                    headline,
                    headlineAddOn,
                    headlineColor: disabledInternal
                      ? "disabled"
                      : headlineColor,
                    headlineLineLimit,
                    level,
                    meta,
                    metaColor: disabledInternal ? "disabled" : metaColor,
                    metaLineLimit,
                    metaLocation,
                    reduceEmphasis: emphasized === false,
                  }),
                }),
                addOnBottom &&
                  jsx("div", {
                    className: stylex(
                      styles.bottomAddOn,
                      addOnBottom.type === "facepile" &&
                        styles.bottomAddOnWithFacepile,
                      addOnBottom.type === "override-row" &&
                        styles.bottomAddOnOverrideRow,
                      addOnBottomTypeIsButton && styles.responsiveButtons
                    ),
                    children: jsx("div", {
                      className: stylex(dummyStyles.dummy2),
                      children: jsx(AddOnBottomComp, {
                        addOnBottom,
                      }),
                    }),
                  }),
              ],
            }),
            addOnEnd
              ? jsx("div", {
                  className: stylex(
                    size !== "small" && styles.endAddOn,
                    size === "small" && styles.endAddOnSmall,
                    (addOnEndButtonTypeIs_primary_secondary_body ||
                      addOnEndIsExpander) &&
                      styles.endAddOnCenter,
                    // @ts-ignore
                    endVerticalAlignStyles[p]
                  ),
                  "data-testid": undefined,
                  ref: addOnEndRef,
                  children: jsx(AddOnEndComp, {
                    addOn: addOnEnd,
                    disabled: addOnEndDisabled ?? disabledInternal, // (t = f) != null ? t : a,
                    level,
                  }),
                })
              : null,
            hasBottomDivider ?? false //  ((u = ba) != null ? u : !1)
              ? jsx("div", {
                  className: stylex(dummyStyles.dummy3),
                })
              : null,
          ],
        }),
      ],
    });

    const addOnEndExpanderComp =
      addOnEnd &&
      addOnEnd.type === "expander" &&
      addOnEnd.open &&
      addOnEnd.children
        ? addOnEnd.children
        : null;

    let checkbox_radio_switch;
    let checkbox_radio_switch_Type;

    if (addOnEnd) {
      switch (addOnEnd.type) {
        case "checkbox":
          checkbox_radio_switch_Type = addOnEnd.on;
          checkbox_radio_switch = "checkbox";
          break;
        case "radio":
          checkbox_radio_switch_Type = addOnEnd.on;
          checkbox_radio_switch = "radio";
          break;
        case "switch":
          checkbox_radio_switch_Type = addOnEnd.value;
          checkbox_radio_switch = "switch";
          break;
      }
    }

    const addOnEndExpanderAria =
      addOnEnd &&
      addOnEnd.type === "expander" &&
      addOnEnd.open &&
      addOnEnd.children;

    const { FocusItem } = useContext(CometFocusGroupContext);

    const { FocusCell, FocusRow } = useContext(CometFocusTableContext);

    const { role: cometCompositeStructureRole } = useContext(
      CometCompositeStructureContext
    );

    const normalizeRole =
      role ?? getItemRoleFromCompositeRole(cometCompositeStructureRole);
    const FocusComp =
      normalizeRole === "row" && FocusRow
        ? FocusRow
        : FocusItem ?? React.Fragment;

    const FocusCellComp = FocusCell ?? React.Fragment;

    return jsxs(FocusComp, {
      children: [
        jsx("div", {
          "aria-selected": normalizeRole === "option" ? selected : undefined,
          role: normalizeRole ?? undefined, // (E = I) != null ? E : void 0,
          style: {
            paddingLeft: paddingHorizontal ?? 8, // ($ = Q) != null ? $ : 8,
            paddingRight: paddingHorizontal ?? 8, // (d = Q) != null ? d : 8,
          },
          ...dataAttrValue,
          children: jsx(FocusCellComp, {
            children:
              onPressInternal || linkProps
                ? jsx(CometPressable, {
                    "aria-checked": checkbox_radio_switch_Type,
                    "aria-current": selected ? "page" : undefined,
                    "aria-describedby": describedby ?? undefined,
                    "aria-expanded":
                      addOnEnd && addOnEnd.type === "expander"
                        ? addOnEndExpanderAria
                        : undefined,
                    "aria-label": ariaLabel,
                    "aria-pressed": ariaPressed,
                    disabled: disabledInternal,
                    display: "block",
                    focusable,
                    linkProps,
                    onFocusChange,
                    onHoverIn,
                    onHoverOut,
                    onPress: onPressInternal,
                    onPressIn,
                    onPressOut,
                    overlayDisabled: selected,
                    overlayFocusRingPosition: "inset",
                    ref,
                    role: checkbox_radio_switch,
                    // eslint-disable-next-line camelcase
                    testOnly_pressed,
                    testid: undefined,
                    xstyle: [
                      styles.pressable,
                      selected &&
                        selectedBackground !== "none" &&
                        styles.selected,
                      selected &&
                        selectedBackground === "wash" &&
                        styles.selectedWashBackground,
                      disabledInternal && styles.disabled,
                    ],
                    children: _children,
                  })
                : jsx("div", {
                    className: stylex(
                      styles.pressable,
                      selected && styles.selected,
                      selected &&
                        selectedBackground === "wash" &&
                        styles.selectedWashBackground,
                      disabledInternal && styles.disabled
                    ),
                    "data-testid": void 0,
                    ref,
                    children: _children,
                  }),
          }),
        }),
        addOnEndExpanderComp,
      ],
    });
  }
);

function AddOnStartComp(props) {
  const { addOnStart, disabled } = props;

  switch (addOnStart.type) {
    case "icon": {
      // eslint-disable-next-line no-unused-vars
      const { type, ...rest } = addOnStart;

      return jsx(CometIcon, { ...rest, disabled: disabled });
    }
    case "profile-photo": {
      // addOnStart.type
      // d = babelHelpers.objectWithoutPropertiesLoose(addOnStart, ['type'])
      // return h.jsx(c('CometProfilePhoto.react'), babelHelpers['extends']({}, d))
      return null;
    }
    case "profile-photo-for-actor": {
      // addOnStart.type
      // d = babelHelpers.objectWithoutPropertiesLoose(addOnStart, ['type'])
      // return h.jsx(
      //   c('CometProfilePhotoForActor.react'),
      //   babelHelpers['extends']({}, d),
      // )
      return null;
    }
    case "contained-icon": {
      // eslint-disable-next-line no-unused-vars
      const { color = "gray", type, ...rest } = addOnStart;

      return jsx("CometSkittleIcon", { color, ...rest, disabled });
      // d = addOnStart.color
      // d = d === void 0 ? 'gray' : d
      // addOnStart.type
      // var e = babelHelpers.objectWithoutPropertiesLoose(addOnStart, [
      //   'color',
      //   'type',
      // ])
      // return h.jsx(
      //   c('CometSkittleIcon.react'),
      //   babelHelpers['extends'](
      //     {
      //       color: d,
      //     },
      //     e,
      //     {
      //       disabled: disabled,
      //     },
      //   ),
      // )
    }
    case "contained-progress-ring-indeterminate": {
      // return h.jsx(c('CometProgressSkittleIndeterminate.react'), {})
      return null;
    }
    case "messenger-facepile": {
      // addOnStart.type
      // d = babelHelpers.objectWithoutPropertiesLoose(addOnStart, ['type'])
      // return h.jsx(
      //   c('MWJewelThreadFacepile.react'),
      //   babelHelpers['extends']({}, d),
      // )
      return null;
    }
    case "override": {
      return addOnStart.component;
    }
    case "emoji": {
      // e = addOnStart.color
      // disabled = e === void 0 ? 'gray' : e
      // d = addOnStart.emoji
      // e = addOnStart.emojiSize
      // e = e === void 0 ? 20 : e
      // var f = addOnStart.size
      // f = f === void 0 ? 40 : f
      // return h.jsx(c('CometSkittleEmoji.react'), {
      //   color: disabled,
      //   emoji: d,
      //   emojiSize: e,
      //   size: f,
      // })
      return null;
    }
    case "sprite": {
      // disabled = addOnStart.sprite
      // return h.jsx(c('CometImageFromIXValueRelayWrapper.react'), {
      //   sprite: disabled,
      // })

      return null;
    }
    default: {
      addOnStart.type;
      return null;
    }
  }
}

function AddOnBottomComp(props) {
  const { addOnBottom } = props;
  switch (addOnBottom.type) {
    case "facepile":
      return addOnBottom.facepile;
    default:
      return addOnBottom.component;
  }
}

function AddOnEndComp(props) {
  const { addOn, disabled, level } = props;

  const f = getListCellAddOn.getEndAddOn(addOn, disabled, level);
  const g = addOn.type === "disclosure" && addOn.text ? addOn.text : undefined;

  return jsxs("div", {
    className: stylex(
      styles.addOn,
      addOn.type === "switch" && styles.visualSwitch
    ),
    children: [
      g &&
        jsx("div", {
          className: stylex(dummyStyles.dummy4),
          children: jsx(TetraText, {
            color: disabled ? "disabled" : "secondary",
            numberOfLines: 1,
            type: level === 3 ? "body2" : "body3",
            children: g,
          }),
        }),
      jsx("div", {
        className: stylex(
          addOn.type === "expander" && styles.addOnWithExpander,
          g && styles.addOnWithText,
          addOn.type === "icon" && styles.addOnWithIcon
        ),
        children: f,
      }),
    ],
  });
}
