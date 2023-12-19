/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable complexity */


import stylex from "@stylexjs/stylex";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { BaseFocusRing, FocusWithinHandler } from "@/faang/focus";
import { isBlueprintStylesEnabled, useMergeRefs } from "@/faang/hooks";
import { CometFormInputValidationStateIcon } from "@/faang/input";

import { CometFormInputWrapperHelperText } from "./cometform-input-wrapper-helper-text";

const aniShake = stylex.keyframes({
  "10%": {
    transform: "translate3d(-1px,0,0)",
  },

  "20%": {
    transform: "translate3d(2px,0,0)",
  },

  "30%": {
    transform: "translate3d(-4px,0,0)",
  },

  "40%": {
    transform: "translate3d(4px,0,0)",
  },

  "50%": {
    transform: "translate3d(-4px,0,0)",
  },

  "60%": {
    transform: "translate3d(4px,0,0)",
  },

  "70%": {
    transform: "translate3d(-4px,0,0)",
  },

  "80%": {
    transform: "translate3d(2px,0,0)",
  },

  "90%": {
    transform: "translate3d(-1px,0,0)",
  },
});

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  disabled: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":active": {
      backgroundColor: "var(--input-background-disabled)",
    },
    backgroundColor: "var(--input-background-disabled)",
    borderColor: "var(--input-border-color)",
    boxShadow: "none",
    cursor: "not-allowed",
  },
  dummy: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  dummy2: {
    display: "flex",
    width: "100%",
  },
  dummy3: {
    backgroundColor: "transparent",
    flexGrow: 1,
    maxWidth: "100%",
    minWidth: 0,
    position: "relative",
  },
  dummy4: {
    display: "flex",
  },
  dummy5: {
    marginTop: "8px",
  },
  error: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":active": {
      backgroundColor:
        "hsla(var(--negative-h),var(--negative-s),var(--negative-l),.05)",
    },
    borderColor: "var(--negative)",
  },
  errorFocused: {
    boxShadow:
      "0 0 0 3px hsla(var(--negative-h),var(--negative-s),var(--negative-l),.2) inset",
  },
  errorHovered: {
    backgroundColor:
      "hsla(var(--negative-h),var(--negative-s),var(--negative-l),.05)",
  },
  headerMask: {
    backgroundColor: "var(--input-background)",
    height: "16px",
    left: "16px",
    position: "absolute",
    right: "16px",
    top: "8px",
  },
  helperText: {
    marginTop: "8px",
  },
  helperTextIsHidden: {
    clip: "rect(0,0,0,0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "absolute",
    width: "1px",
  },
  hiddenHelperText: {
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: "inset(50%)",
    clip: "rect(0,0,0,0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "absolute",
    width: "1px",
  },
  hovered: {
    borderColor: "var(--input-border-color-hover)",
  },
  input: {
    backgroundColor: "transparent",
    flexGrow: 1,
    maxWidth: "100%",
    minWidth: "0",
    position: "relative",
  },

  inputRow: {
    display: "flex",
    width: "100%",
  },

  label: {
    fontSize: "1rem",
    fontWeight: "normal",
    lineHeight: "1.25",
    maxWidth: "100%",
    transformOrigin: "top left",
  },

  labelDisabled: {
    color: "var(--disabled-text)",
  },

  labelError: {
    color: "var(--negative)",
  },

  labelHighlighted: {
    color: "var(--input-label-color-highlighted)",
  },

  labelInside: {
    color: "var(--secondary-text)",
    cursor: "inherit",
    display: "block",
    left: "16px",
    overflowX: "hidden",
    overflowY: "hidden",
    pointerEvents: "none",
    position: "absolute",
    right: "8px",
    textOverflow: "ellipsis",
    top: "18px",
    transitionDuration: "var(--fds-fast)",
    transitionProperty: "transform",
    transitionTimingFunction: "var(--fds-soft)",
    whiteSpace: "nowrap",
  },

  //
  labelInternal: {
    color: "var(--text-input-outside-label)",
    fontSize: "1rem",
    fontWeight: "normal",
    lineHeight: 1.25,
    marginBottom: "8px",
    maxWidth: "100%",
    position: "relative",
    transformOrigin: "top left",
  },

  labelOutside: {
    color: "var(--text-input-outside-label)",
    marginBottom: " 8px",
    position: "relative",
  },

  labelShrunk: {
    right: "auto",
    transform: "scale(.75) translateY(-11px)",
  },

  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":active": {
      backgroundColor:
        "hsla(var(--accent-h),var(--accent-s),var(--accent-l),.05)",
    },
    backgroundColor: "var(--input-background)",
    borderColor: "var(--input-border-color)",
    borderRadius: "var(--input-corner-radius)",
    borderStyle: "solid",
    borderWidth: "var(--input-border-width)",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden",
    position: "relative",
    zIndex: "unset",
  },

  secondary: {
    display: "flex",
  },

  shake: {
    animationDuration: ".82s",
    animationFillMode: "both",
    animationName: aniShake,
    animationTimingFunction: "var(--fds-soft)",
  },

  validationIcon: {
    paddingRight: "16px",
    paddingTop: "18px",
  },

  validationIconHideLabel: {
    paddingTop: "12px",
  },

  warn: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":active": {
      backgroundColor:
        "hsla(var(--warning-h),var(--warning-s),var(--warning-l),.05)",
    },
    borderColor: "var(--warning)",
  },

  warnFocused: {
    boxShadow:
      "0 0 0 3px hsla(var(--warning-h),var(--warning-s),var(--warning-l),.2) inset",
  },

  warnHovered: {
    backgroundColor:
      "hsla(var(--warning-h),var(--warning-s),var(--warning-l),.05)",
  },
});

const cursorStyles = stylex.create({
  pointer: {
    cursor: "pointer",
  },
  text: {
    cursor: "text",
  },
});

const bluePrintStyles = stylex.create({
  root: {
    borderRadius: "12px",
  },
});

function isEmptyOrFalsy(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === "object") {
    if (value) {
      // eslint-disable-next-line guard-for-in, no-unreachable-loop
      for (let _b in value) {
        return false;
      }
    }
    return true;
  } else {
    return value === null || value === "";
  }
}

/**
 * @typedef {Object} CometFormInputWrapperProps
 * @property {React.ReactNode} addOnBottom - Additional content to be added at the bottom.
 * @property {React.ReactNode} addOnStart - Additional content to be added at the start.
 * @property {boolean} alwaysShrinkLabel - Indicates whether the label should always shrink.
 * @property {*} containerRef - Reference to the container.
 * @property {*} aria-activedescendant - Value for the 'aria-activedescendant' attribute.
 * @property {*} aria-expanded - Value for the 'aria-expanded' attribute.
 * @property {*} aria-haspopup - Value for the 'aria-haspopup' attribute.
 * @property {*} aria-controls - Value for the 'aria-controls' attribute.
 * @property {*} ariaLabel - Value for the 'aria-label' attribute.
 * @property {*} auxContent - Additional content.
 * @property {*} children - Child components.
 * @property {*} comboboxKeyDown - Key down event handler for combobox.
 * @property {'pointer' | 'text'} cursor - The cursor style ('pointer' or 'text').
 * @property {boolean} disabled - Indicates whether the input is disabled.
 * @property {*} helperText - Helper text content.
 * @property {boolean} helperTextIsHidden - Indicates whether the helper text is hidden.
 * @property {boolean} hideLabel - Indicates whether the label should be hidden.
 * @property {*} label - Label content.
 * @property {string} labelLocation_INTERNAL - Internal label location.
 * @property {*} labelRef - Reference to the label.
 * @property {*} onFocusChange - Focus change event handler.
 * @property {*} onPress - Press event handler.
 * @property {*} role - Role attribute value.
 * @property {boolean} shrinkLabelOnFocus - Indicates whether the label should shrink on focus.
 * @property {boolean} suppressFocusRing - Indicates whether the focus ring should be suppressed.
 * @property {*} validationState - Validation state.
 * @property {*} value - Input value.
 * @property {boolean} withHeaderMask - Indicates whether a header mask is present.
 */

/**
 *
 * @param {CometFormInputWrapperProps} props
 * @returns
 */
export function CometFormInputWrapper(props) {
  const {
    addOnBottom,
    addOnStart,
    alwaysShrinkLabel = false,
    "aria-activedescendant": ariaActivedescendant,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHaspopup,
    ariaLabel,
    auxContent,
    children,
    comboboxKeyDown,
    containerRef,
    cursor,
    disabled = false,
    helperText,
    helperTextIsHidden = false,
    hideLabel = false,
    label,
    labelLocation_INTERNAL = "inside",
    labelRef,
    onFocusChange,
    onPress,
    role,
    shrinkLabelOnFocus = true,
    suppressFocusRing,
    validationState,
    value,
    withHeaderMask = false,
  } = props;

  const id = useId();
  const id2 = useId();

  const [isShake, setShake] = useState(false);
  const [_hovered, setHovered] = useState(false);

  const filled = !isEmptyOrFalsy(value);

  const labelLocation_INTERNALOutside = labelLocation_INTERNAL === "outside";

  // eslint-disable-next-line react/no-unstable-nested-components
  const W = (bool) => {
    return labelLocation_INTERNALOutside 
    ? <label className={stylex(styles.labelInternal)} suppressHydrationWarning>{label}</label>
    : <span ref={labelRef} className={stylex(
            styles.label,
            styles.labelInside,
            validationState === "ERROR" && styles.labelError,
            validationState === null && bool && styles.labelHighlighted,
            (filled || alwaysShrinkLabel || (bool && shrinkLabelOnFocus)) &&
              styles.labelShrunk,
            disabled && styles.labelDisabled
          )}>
        {label}
      </span>  
      // jsx("span", {
      //     children: label,
      //     className: stylex(
      //       styles.label,
      //       styles.labelInside,
      //       validationState === "ERROR" && styles.labelError,
      //       validationState === null && bool && styles.labelHighlighted,
      //       (filled || alwaysShrinkLabel || (bool && shrinkLabelOnFocus)) &&
      //         styles.labelShrunk,
      //       disabled && styles.labelDisabled
      //     ),
      //     ref: labelRef,
      //   });
  };

  const onMouseEnterCb = useCallback(() => {
    _hovered || setHovered(true);
  }, [_hovered]);

  const onMouseLeaveCb = useCallback(() => {
    _hovered && setHovered(false);
  }, [_hovered]);

  const rootRef = useRef(null);
  const wrapperRef = useRef(null);

  const _ref = useMergeRefs(rootRef, containerRef);

  const [ba, ca] = useState(false);

  useEffect(() => {
    if (!comboboxKeyDown) {
      return;
    }
    let a = wrapperRef && wrapperRef.current;
    if (a) {
      a.addEventListener("keydown", comboboxKeyDown);
      return () => {
        a.removeEventListener("keydown", comboboxKeyDown);
      };
    }
  }, [comboboxKeyDown]);


  // return jsxs("div", {
  //   children: [
  //     labelLocation_INTERNALOutside && W(false),
  //     jsx(FocusWithinHandler, {
  //       children: (_focused) => {
  //         return jsx(BaseFocusRing, {
  //           // eslint-disable-next-line complexity
  //           children: (focusRingClassname) => {
  //             return jsxs("label", {
  //               "aria-activedescendant": ariaActivedescendant,
  //               "aria-controls": ariaControls,
  //               "aria-expanded": ariaExpanded,
  //               "aria-haspopup": ariaHaspopup,
  //               "aria-label": ariaLabel ? ariaLabel : label,
  //               children: [
  //                 jsxs("div", {
  //                   children: [
  //                     addOnStart,
  //                     jsxs("div", {
  //                       children: [
  //                         withHeaderMask &&
  //                           !disabled &&
  //                           (filled || _focused) &&
  //                           jsx("span", {
  //                             className: stylex(
  //                               styles.headerMask,
  //                               validationState === "WARN" &&
  //                                 _hovered &&
  //                                 styles.warnHovered,
  //                               validationState === "ERROR" &&
  //                                 _hovered &&
  //                                 styles.errorHovered
  //                             ),
  //                           }),
  //                         !hideLabel &&
  //                           !labelLocation_INTERNALOutside &&
  //                           W(_focused),
  //                         jsx(FocusWithinHandler, {
  //                           children: children({
  //                             filled: filled,
  //                             focused: _focused,
  //                             helperTextID:
  //                               helperText && validationState ? id2 : void 0,
  //                             id: id,
  //                             rootRef: rootRef,
  //                           }),
  //                           onFocusChange: ca,
  //                         }),
  //                       ],
  //                       className: stylex(styles.dummy3),
  //                     }),
  //                     (auxContent || validationState) &&
  //                       jsxs("div", {
  //                         children: [
  //                           validationState &&
  //                             jsx("div", {
  //                               // TODO
  //                               children:
  //                                 CometFormInputValidationStateIcon[
  //                                   validationState
  //                                 ],

  //                               className: stylex(
  //                                 styles.validationIcon,
  //                                 hideLabel && styles.validationIconHideLabel
  //                               ),
  //                             }),
  //                           auxContent,
  //                         ],
  //                         className: stylex(styles.dummy4),
  //                       }),
  //                   ],
  //                   className: stylex(styles.dummy2),
  //                 }),
  //                 addOnBottom,
  //               ],
  //               className: stylex(
  //                 styles.root,
  //                 isBlueprintStylesEnabled() && bluePrintStyles.root,
  //                 cursorStyles[cursor],
  //                 _hovered && styles.hovered,
  //                 _focused && BaseFocusRing.focusRingXStyle,
  //                 validationState === "WARN" && styles.warn,
  //                 validationState === "WARN" && _hovered && styles.warnHovered,
  //                 validationState === "WARN" && _focused && styles.warnFocused,
  //                 //
  //                 validationState === "ERROR" && styles.error,
  //                 validationState === "ERROR" &&
  //                   _hovered &&
  //                   styles.errorHovered,
  //                 validationState === "ERROR" &&
  //                   _focused &&
  //                   styles.errorFocused,
  //                 //
  //                 disabled && styles.disabled,
  //                 isShake && styles.shake,
  //                 focusRingClassname
  //               ),
  //               htmlFor: id,
  //               onAnimationEnd: () => {
  //                 setShake(false);
  //               },
  //               onClick: (event) => {
  //                 disabled ? setShake(true) : onPress && onPress(event);
  //               },
  //               onMouseEnter: onMouseEnterCb,
  //               onMouseLeave: onMouseLeaveCb,
  //               ref: _ref,
  //               role: onPress ? (role ? role : "button") : void 0,
  //               suppressHydrationWarning: true,
  //               tabIndex: onPress ? 0 : void 0,
  //             });
  //           },
  //           suppressFocusRing: !ba || suppressFocusRing,
  //         });
  //       },
  //       onFocusChange,
  //     }),
  //     helperText &&
  //       (helperTextIsHidden
  //         ? jsx("div", {
  //             children: helperText,
  //             className: stylex(styles.helperTextIsHidden),
  //             id: id2,
  //           })
  //         : jsx("div", {
  //             children: jsx(CometFormInputWrapperHelperText, {
  //               validationState,
  //               value: helperText,
  //             }),
  //             className: stylex(styles.dummy5),
  //             id: id2,
  //           })),
  //   ],
  //   className: stylex(styles.dummy),
  //   ref: wrapperRef,
  // });


  return (
    <div className={stylex(styles.dummy)}>
      {labelLocation_INTERNALOutside && W(false)}
      <FocusWithinHandler onFocusChange={onFocusChange}>
        {(_focused) => (
          <BaseFocusRing
            suppressFocusRing={!ba || suppressFocusRing}
          >
            {(focusRingClassname) => (
              <label
                aria-activedescendant={ariaActivedescendant}
                aria-controls={ariaControls}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHaspopup}
                aria-label={ariaLabel ? ariaLabel : label}
                className={stylex(
                  styles.root,
                  isBlueprintStylesEnabled() && bluePrintStyles.root,
                  cursorStyles[cursor],
                  _hovered && styles.hovered,
                  _focused && BaseFocusRing.focusRingXStyle,
                  validationState === 'WARN' && styles.warn,
                  validationState === 'WARN' && _hovered && styles.warnHovered,
                  validationState === 'WARN' && _focused && styles.warnFocused,
                  validationState === 'ERROR' && styles.error,
                  validationState === 'ERROR' && _hovered && styles.errorHovered,
                  validationState === 'ERROR' && _focused && styles.errorFocused,
                  disabled && styles.disabled,
                  isShake && styles.shake,
                  focusRingClassname
                )}
                htmlFor={id}
                onAnimationEnd={() => {
                  setShake(false);
                }}
                onClick={(event) => {
                  disabled ? setShake(true) : onPress && onPress(event);
                }}
                onMouseEnter={onMouseEnterCb}
                onMouseLeave={onMouseLeaveCb}
                ref={_ref}
                role={onPress ? (role ? role : 'button') : undefined}
                suppressHydrationWarning={true}
                tabIndex={onPress ? 0 : undefined}
              >
                <div className={stylex(styles.dummy2)}>
                  <div>
                    {addOnStart}
                    <div className={stylex(styles.dummy3)}>
                      {withHeaderMask &&
                        !disabled &&
                        (filled || _focused) && (
                          <span
                            className={stylex(
                              styles.headerMask,
                              validationState === 'WARN' &&
                                _hovered &&
                                styles.warnHovered,
                              validationState === 'ERROR' &&
                                _hovered &&
                                styles.errorHovered
                            )}
                          />
                        )}
                      {!hideLabel &&
                        !labelLocation_INTERNALOutside &&
                        W(_focused)}
                      <FocusWithinHandler
                        onFocusChange={ca}
                      >
                        {children({
                          filled: filled,
                          focused: _focused,
                          helperTextID:
                            helperText && validationState ? id2 : undefined,
                          id: id,
                          rootRef: rootRef,
                        })}
                      </FocusWithinHandler>
                    </div>
                    {(auxContent || validationState) && (
                      <div className={stylex(styles.dummy4)}>
                        {validationState && (
                          <div
                            className={stylex(
                              styles.validationIcon,
                              hideLabel && styles.validationIconHideLabel
                            )}
                          >
                            {CometFormInputValidationStateIcon[validationState]}
                          </div>
                        )}
                        {auxContent}
                      </div>
                    )}
                  </div>
                  {addOnBottom}
                </div>
              </label>
            )}
          </BaseFocusRing>
        )}
      </FocusWithinHandler>
      {helperText && (
        helperTextIsHidden ? (
          <div id={id2} className={stylex(styles.helperTextIsHidden)}>
            {helperText}
          </div>
        ) : (
          <div className={stylex(styles.dummy5)} id={id2}>
            <CometFormInputWrapperHelperText
              validationState={validationState}
              value={helperText}
            />
          </div>
        )
      )}
    </div>
  );
}

