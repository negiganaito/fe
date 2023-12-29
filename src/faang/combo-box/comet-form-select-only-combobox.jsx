/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable camelcase */

import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import stylex from "@stylexjs/stylex";
import emptyFunction from "fbjs/lib/emptyFunction";

import { BaseContextualLayer } from "@/faang/base-contextual-layer";
import {
  CometComponentWithKeyCommands,
  useCometFormSelectMenuTriggerKeyDownHandler,
} from "@/faang/commet-key-commands";
import { FocusWithinHandler } from "@/faang/focus";
import { FocusInertRegion, focusScopeQueries } from "@/faang/focus-region";
import { CometFormInputWrapper } from "@/faang/form";
import { useCometFormSelectOnlyComboboxKeyConfigs } from "@/faang/hooks";
import { CometIcon, fbicon } from "@/faang/icon";
import { CometFormComboboxMenuItem, CometMenu } from "@/faang/popover";
import { ix } from "@/faang/utils";

// import BaseContextualLayer from '@fb/components/base-contextual-layer'

// type CometFormSelectOnlyComboboxProps = {
//   align?
//   ariaLabel?: string
//   auxItemType?
//   defaultIcon?
//   disabled?: boolean
//   footer_deprecated?
//   header?
//   helperText?
//   helperTextIsHidden?: boolean
//   iconType?
//   label?: string
//   labelLocation_INTERNAL?
//   labelRef?
//   onNullValue?
//   onValueChange?
//   onVisibilityChange?
//   options?
//   position?: string
//   size?
//   testid?: string
//   truncate?: boolean
//   validationState?
//   value?
// }

const styles = stylex.create({
  button: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 0,
    boxSizing: "border-box",
    color: "var(--primary-text)",
    display: "flex",
    fontSize: "1rem",
    fontWeight: "normal",
    lineHeight: 1.25,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: "0",
    outline: "none",
    paddingTop: "26px",
    paddingRight: "16px",
    paddingBottom: "10px",
    paddingLeft: "16px",
    position: "relative",
    textAlign: "inherit",
    width: "100%",
    zIndex: 0,
  },
  buttonWithIcon: {
    paddingLeft: "52px",
  },
  disabled: {
    color: "var(--disabled-text)",
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  icon: {
    alignSelf: "center",
    paddingRight: "16px",
  },
  labelOutsideButton: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  selectedIcon: {
    paddingLeft: "16px",
    paddingTop: "18px",
  },
  selectedProfilePicture: {
    paddingLeft: "16px",
    paddingTop: "12px",
  },
  truncated: {
    overflowX: "hidden",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  wrapper: {
    width: "100%",
  },
  wrapperWithIcon: {
    marginLeft: "-36px",
  },
});

const dummyStyles = stylex.create({
  dummy1: {
    paddingLeft: "16px",
    paddingTop: "18px",
  },

  dummy2: {
    paddingLeft: "16px",
    paddingTop: "12px",
  },

  dummy3: {
    alignSelf: "center",
    paddingRight: "16px",
  },
});

// eslint-disable-next-line complexity
export function CometFormSelectOnlyCombobox({
  align,
  ariaLabel,
  auxItemType,
  defaultIcon,
  disabled = false,
  footer_deprecated,
  header,
  helperText,
  helperTextIsHidden = false,
  iconType = "icon",
  label,
  labelLocation_INTERNAL,
  labelRef,
  onNullValue,
  onValueChange,
  onVisibilityChange = emptyFunction,
  options,
  position,
  size,
  testid,
  truncate = true,
  validationState,
  value,
  ...rest
}) {
  const id1 = useId();
  const visibleId = useId();

  const [show, setShow] = useState(false);
  const [activeValue, setActiveValue] = useState(null);

  const isMenuVisible = useMemo(
    () => show && options.length > 0,
    [show, options]
  );

  // show && options.length > 0

  const contextRef = useRef(null);

  const filteredOptions = options.filter((option) => !option.disabled);
  const activeValueIndex = options.findIndex(
    (option) => option.value === activeValue
  );

  const defaultOptionIconData = !defaultIcon
    ? undefined
    : {
        iconProps: defaultIcon,
        type: iconType,
      };

  let selectedOptionIcon = null;
  let selectedOptionLabel = null;

  const selectedOptions = options.find((option) => option.value === value);

  if (value && selectedOptions) {
    selectedOptionIcon = selectedOptions.icon;
    selectedOptionLabel = selectedOptions.label;
    if (iconType === "profile-picture" && selectedOptionIcon) {
      selectedOptionIcon.shape =
        selectedOptionIcon.shape ?? selectedOptionIcon.style;
      selectedOptionIcon.source = selectedOptionIcon.source ?? {
        uri: selectedOptionIcon.src,
      };
    }
  }

  const selectedOptionIconData = !selectedOptionIcon
    ? undefined
    : {
        iconProps: selectedOptionIcon,
        type: iconType,
      };

  const normalizeIcon = selectedOptionIconData ?? defaultOptionIconData;

  const onShowCb = useCallback(() => {
    setShow(true);
    onVisibilityChange(true);
  }, [onVisibilityChange]);

  const onHideCb = useCallback(() => {
    setActiveValue(null);
    setShow(false);
    onVisibilityChange(false);
  }, [onVisibilityChange]);

  const onFocusChange = useCallback(
    (focusValue) => {
      if (!focusValue) {
        onHideCb();
      }
      // focusValue || onHideCb()
    },
    [onHideCb]
  );

  const mergeIds = (i1, i2) => {
    return i1 + "__" + (i2 ?? "0");
  };

  const onPressCb = useCallback(() => {
    if (isMenuVisible) {
      activeValue
        ? onValueChange(activeValue)
        : // eslint-disable-next-line no-sequences
          !activeValue && onNullValue && onNullValue(null),
        onHideCb();
    } else {
      setActiveValue(value ?? null);
      onShowCb();
    }
  }, [activeValue, isMenuVisible, onValueChange, onHideCb, onShowCb, value]);

  const commandConfigs = useCometFormSelectOnlyComboboxKeyConfigs({
    activeValue,
    filteredOptions,
    isMenuVisible,
    onHide: onHideCb,
    onPress: onPressCb,
    onShow: onShowCb,
    setActiveValue,
    value,
  });

  const comboboxKeyDown = useCometFormSelectMenuTriggerKeyDownHandler(
    setActiveValue,
    activeValue,
    filteredOptions,
    isMenuVisible,
    onShowCb
  );

  return (
    <FocusWithinHandler onFocusChange={onFocusChange}>
      <CometComponentWithKeyCommands
        commandConfigs={disabled ? [] : commandConfigs}
      >
        <CometFormInputWrapper
          addOnStart={
            normalizeIcon &&
            (normalizeIcon.type === "icon" ? (
              <div className={stylex(dummyStyles.dummy1)}>
                <CometIcon color="secondary" icon={normalizeIcon.iconProps} />
              </div>
            ) : normalizeIcon.type === "profile-picture" ? (
              <div className={stylex(dummyStyles.dummy2)}>
                {/* children: jsx("CometProfilePhoto.react", {
                  ...normalizeIcon.iconProps,
                  size: 32,
                }), */}
              </div>
            ) : null)
          }
          aria-activedescendant={
            isMenuVisible && activeValue && activeValueIndex !== -1
              ? mergeIds(id1, activeValueIndex)
              : undefined
          }
          aria-controls={isMenuVisible ? visibleId : undefined}
          aria-expanded={isMenuVisible}
          aria-haspopup="listbox"
          ariaLabel={ariaLabel}
          auxContent={
            <div className={stylex(dummyStyles.dummy3)}>
              <CometIcon color="primary" icon={fbicon._(ix(481882), 16)} />
            </div>
          }
          comboboxKeyDown={comboboxKeyDown}
          cursor="pointer"
          disabled={disabled}
          helperText={helperText}
          helperTextIsHidden={helperTextIsHidden}
          label={label}
          labelLocation_INTERNAL={labelLocation_INTERNAL}
          labelRef={labelRef}
          onPress={(ev) => {
            if (ev.target === contextRef.current) {
              return;
            }
            onShowCb();
          }}
          role="combobox"
          shrinkLabelOnFocus={false}
          validationState={validationState}
          value={value}
          children={({ id }) => {
            return (
              <div
                className={stylex(
                  normalizeIcon ? styles.wrapperWithIcon : styles.wrapper
                )}
                id={id}
                ref={(node) => {
                  contextRef.current = node;
                }}
                suppressHydrationWarning
              >
                <div
                  className={stylex(
                    styles.button,
                    // eslint-disable-next-line camelcase
                    labelLocation_INTERNAL === "outside" &&
                      styles.labelOutsideButton,
                    disabled && styles.disabled,
                    normalizeIcon && styles.buttonWithIcon
                  )}
                  data-testid={undefined}
                >
                  <span className={stylex(truncate && styles.truncated)}>
                    {selectedOptionLabel ?? "\xa0"}
                  </span>
                </div>
              </div>
            );
          }}
        />

        {isMenuVisible && (
          <BaseContextualLayer
            align={size === "full" ? "stretch" : align}
            {...rest}
            contextRef={contextRef}
          >
            <FocusInertRegion focusQuery={focusScopeQueries.tabbableScopeQuery}>
              <CometMenu
                footer={
                  footer_deprecated
                    ? {
                        text: footer_deprecated,
                      }
                    : undefined
                }
                header={header}
                id={visibleId}
                role="listbox"
                size={size}
                truncate={truncate}
              >
                {options.map((option, key) => {
                  const isSelected = option.value === value;

                  return (
                    <CometFormComboboxMenuItem
                      key={option.value}
                      aria-disabled={option.disabled}
                      aria-setsize={options.length}
                      auxItemType={auxItemType}
                      bodyColor={option.bodyColor}
                      bodyText={option.bodyText}
                      disabled={option.disabled}
                      icon={option.icon}
                      iconType={iconType}
                      id={mergeIds(id1, key)}
                      isSelected={isSelected}
                      onClick={() => {
                        onValueChange(option.value);
                        onHideCb();
                      }}
                      primaryText={option.label}
                      secondaryColor={option.secondaryColor}
                      secondaryText={option.secondaryText}
                      testid={undefined}
                      visuallyFocused={option.value === activeValue}
                    />
                  );

                  // return jsx(
                  //   CometFormComboboxMenuItem,
                  //   {
                  //     "aria-disabled": option.disabled,
                  //     "aria-setsize": options.length,
                  //     auxItemType,
                  //     bodyColor: option.bodyColor,
                  //     bodyText: option.bodyText,
                  //     disabled: option.disabled,
                  //     icon: option.icon,
                  //     iconType,
                  //     id: mergeIds(id1, key),
                  //     isSelected,
                  //     onClick: () => {
                  //       onValueChange(option.value);
                  //       onHideCb();
                  //     },
                  //     primaryText: option.label,
                  //     secondaryColor: option.secondaryColor,
                  //     secondaryText: option.secondaryText,
                  //     testid: undefined,
                  //     visuallyFocused: option.value === activeValue,
                  //   },
                  //   option.value
                  // );
                })}
              </CometMenu>
            </FocusInertRegion>
          </BaseContextualLayer>
        )}
      </CometComponentWithKeyCommands>
    </FocusWithinHandler>
  );

  // return jsx(FocusWithinHandler, {
  //   onFocusChange,
  //   children: jsxs(CometComponentWithKeyCommands, {
  //     commandConfigs: disabled ? [] : commandConfigs,
  //     children: [
  //       jsx(CometFormInputWrapper, {
  //         addOnStart:
  //           normalizeIcon &&
  //           (normalizeIcon.type === "icon"
  //             ? jsx("div", {
  //                 className: stylex(dummyStyles.dummy1), // 'x1swvt13 x109j2v6',
  //                 children: jsx(CometIcon, {
  //                   color: "secondary",
  //                   icon: normalizeIcon.iconProps,
  //                 }),
  //               })
  //             : normalizeIcon.type === "profile-picture"
  //             ? jsx("div", {
  //                 className: stylex(dummyStyles.dummy2), // 'x1swvt13 xz9dl7a',
  //                 children: jsx("CometProfilePhoto.react", {
  //                   ...normalizeIcon.iconProps,
  //                   size: 32,
  //                 }),
  //               })
  //             : null),
  //         "aria-activedescendant":
  //           isMenuVisible && activeValue && activeValueIndex !== -1
  //             ? mergeIds(id1, activeValueIndex)
  //             : undefined,
  //         "aria-controls": isMenuVisible ? visibleId : undefined,
  //         "aria-expanded": isMenuVisible,
  //         "aria-haspopup": "listbox",
  //         ariaLabel,
  //         auxContent: jsx("div", {
  //           className: stylex(dummyStyles.dummy3), //  'xamitd3 x1pi30zi',
  //           children: jsx(CometIcon, {
  //             color: "primary",
  //             icon: fbicon._(
  //               ix(481882),
  //               // {
  //               //   sprited: 2,
  //               //   spi: "/assets/fb/yTUMQJovBsj.png",
  //               //   _spi: "/assets/fb/yTUMQJovBsj.png",
  //               //   w: 16,
  //               //   h: 16,
  //               //   p: "-119px -147px",
  //               //   sz: "auto",
  //               //   loggingID: "481882",
  //               // },
  //               16
  //             ),
  //           }),
  //         }),
  //         comboboxKeyDown,
  //         cursor: "pointer",
  //         disabled,
  //         helperText,
  //         helperTextIsHidden,
  //         label,
  //         // eslint-disable-next-line camelcase
  //         labelLocation_INTERNAL,
  //         labelRef,
  //         onPress: function (a) {
  //           if (a.target === contextRef.current) {
  //             return;
  //           }
  //           onShowCb();
  //         },
  //         role: "combobox",
  //         shrinkLabelOnFocus: false,
  //         validationState,
  //         value,
  //         children: ({ id }) => {
  //           return jsx("div", {
  //             className: stylex(
  //               normalizeIcon ? styles.wrapperWithIcon : styles.wrapper
  //             ),
  //             id,
  //             ref: (node) => {
  //               contextRef.current = node;
  //             },
  //             suppressHydrationWarning: true,
  //             children: jsx("div", {
  //               className: stylex(
  //                 styles.button,
  //                 // eslint-disable-next-line camelcase
  //                 labelLocation_INTERNAL === "outside" &&
  //                   styles.labelOutsideButton,
  //                 disabled && styles.disabled,
  //                 normalizeIcon && styles.buttonWithIcon
  //               ),
  //               "data-testid": undefined,
  //               children: jsx("span", {
  //                 className: stylex(truncate && styles.truncated),
  //                 children: selectedOptionLabel ?? "\xa0",
  //               }),
  //             }),
  //           });
  //         },
  //       }),
  //       isMenuVisible &&
  //         jsx(BaseContextualLayer, {
  //           align: size === "full" ? "stretch" : align,
  //           ...rest,
  //           contextRef,
  //           children: jsx(FocusInertRegion, {
  //             focusQuery: focusScopeQueries.tabbableScopeQuery,
  //             children: jsx(CometMenu, {
  //               footer: footer_deprecated
  //                 ? {
  //                     text: footer_deprecated,
  //                   }
  //                 : undefined,
  //               header,
  //               id: visibleId,
  //               role: "listbox",
  //               size,
  //               truncate,

  //               children: options.map((option, key) => {
  //                 const isSelected = option.value === value;
  //                 return jsx(
  //                   CometFormComboboxMenuItem,
  //                   {
  //                     "aria-disabled": option.disabled,
  //                     "aria-setsize": options.length,
  //                     auxItemType,
  //                     bodyColor: option.bodyColor,
  //                     bodyText: option.bodyText,
  //                     disabled: option.disabled,
  //                     icon: option.icon,
  //                     iconType,
  //                     id: mergeIds(id1, key),
  //                     isSelected,
  //                     onClick: () => {
  //                       onValueChange(option.value);
  //                       onHideCb();
  //                     },
  //                     primaryText: option.label,
  //                     secondaryColor: option.secondaryColor,
  //                     secondaryText: option.secondaryText,
  //                     testid: undefined,
  //                     visuallyFocused: option.value === activeValue,
  //                   },
  //                   option.value
  //                 );
  //               }),
  //             }),
  //           }),
  //         }),
  //     ],
  //   }),
  // });
}
