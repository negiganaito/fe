/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef, useState } from "react";
import stylex from "@stylexjs/stylex";

import { CometImage } from "@/faang/base-image";
import { useBaseInputValidators } from "@/faang/hooks";
import { CometIcon, ImageIconSource } from "@/faang/icon";
import { CometFormInputPasswordStateIcon } from "@/faang/input";
import { CometPressable } from "@/faang/pressable";

import { BaseTextInput } from "./base-text-input";
import { CometFormInputWrapper } from "./comet-form-input-wrapper";

const styles = stylex.create({
  disabled: {
    backgroundColor: "var(--input-background-disabled)",
    color: "var(--disabled-text)",
    cursor: "not-allowed",
  },
  //
  dummy1: {
    display: "flex",
  },

  dummy2: {
    paddingRight: "16px",
    paddingTop: "18px",
  },

  emoji: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "12px",
    pointerEvents: "none",
  },

  icon: {
    paddingLeft: "16px",
    paddingTop: "18px",
    pointerEvents: "none",
  },

  imageIcon: {
    borderRadius: "8px",
    boxShadow: "inset 0 0 0 1px var(--media-inner-border)",
  },

  input: {
    // TODO
    // eslint-disable-next-line @stylexjs/valid-styles
    "::-ms-clear": {
      display: "none",
    },

    // eslint-disable-next-line @stylexjs/valid-styles
    "::-ms-reveal": {
      display: "none",
    },

    backgroundColor: "transparent",

    borderBottomStyle: "none",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderTopStyle: "none",

    boxSizing: "border-box",

    color: "var(--primary-text)",

    fontSize: "1rem !important",

    fontWeight: "normal",

    lineHeight: 1.25,

    padding: "26px 16px 10px 16px",
    width: "100%",
  },

  largeImageIcon: {
    alignItems: "center",
    display: "flex",
    paddingTop: 0,
  },

  readOnly: {
    backgroundColor: "var(--input-background-disabled)",
  },
});

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometFormTextInputProps>
 */
export const CometFormTextInput = forwardRef((props, ref) => {
  const {
    autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD,
    auxContent,
    disabled = false,
    emojiSkittle,
    helperText,
    helperTextIsHidden = false,
    icon,
    inputMode,
    label,
    labelRef,
    maxLength,
    onBlur,
    onClick,
    onFocus,
    onValueChange,
    placeholder,
    readOnly,
    suppressFocusRing,
    type = "text",
    validationState,
    validator,
    value,
    xstyle,
    autoComplete,
    ...rest
  } = props;

  const { topResultReason, topResultType } = useBaseInputValidators({
    validator,
    value: value ?? "",
  });

  const isPassword = type === "password";

  const [isPress, setPress] = useState(false);

  const isPasswordIcon = isPassword && Boolean(value);

  const PasswordIcon = isPasswordIcon ? (
    <div className={stylex(styles.dummy1)}>
      <div className={stylex(styles.dummy2)}>
        <CometPressable onPress={() => setPress(!isPress)} overlayDisabled>
          <CometFormInputPasswordStateIcon isVisible={isPress} />
        </CometPressable>
      </div>
    </div>
  ) : null;

  const typeAfterChange = isPassword ? (isPress ? "text" : "password") : type;
  const normalTopResultType =
    topResultType !== "CORRECT" ? topResultType : validationState;

  // return jsx(CometFormInputWrapper, {
  //   addOnStart:
  //     (icon &&
  //       icon instanceof ImageIconSource &&
  //       icon.height === 40 &&
  //       jsx("div", {
  //         children: jsx("CometImage", {
  //           className: stylex(styles.imageIcon),
  //           height: parseInt(icon.height.toString(), 10),
  //           src: icon.src,
  //           width: parseInt(icon.width.toString(), 10),
  //         }),
  //         className: stylex(styles.icon, styles.largeImageIcon),
  //       })) ||
  //     (icon &&
  //       jsx("div", {
  //         children: jsx(CometIcon, {
  //           color: "secondary",
  //           icon,
  //         }),
  //         className: stylex(styles.icon),
  //       })) ||
  //     (emojiSkittle &&
  //       jsx("div", {
  //         children: emojiSkittle,
  //         className: stylex(styles.emoji),
  //       })),
  //   auxContent: PasswordIcon ?? auxContent,
  //   children: ({ focused, helperTextID, id }) => {
  //     return jsx(BaseTextInput, {
  //       "aria-describedby": helperTextID,
  //       "aria-invalid": normalTopResultType === "ERROR",
  //       autoComplete,
  //       autoFocus: autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD,
  //       disabled,
  //       id,
  //       inputMode,
  //       maxLength,
  //       onBlur,
  //       onClick,
  //       onFocus,
  //       onValueChange,
  //       placeholder: focused ? placeholder : null,
  //       readOnly,
  //       ref,
  //       suppressFocusRing: true,
  //       testid: undefined,
  //       type: typeAfterChange,
  //       value,
  //       xstyle: [
  //         styles.input,
  //         disabled && styles.disabled,
  //         readOnly && readOnly === true && styles.readOnly,
  //         xstyle,
  //       ],
  //       ...rest,
  //     });
  //   },
  //   cursor: "text",
  //   disabled,
  //   helperText: topResultReason ?? helperText,
  //   helperTextIsHidden,
  //   label,
  //   labelRef,
  //   suppressFocusRing,
  //   validationState: normalTopResultType,
  //   value,
  // });

  return (
    <CometFormInputWrapper
      addOnStart={
        (icon && icon instanceof ImageIconSource && icon.height === 40 && (
          <div className={stylex(styles.icon, styles.largeImageIcon)}>
            <CometImage
              xstyle={stylex(styles.imageIcon)}
              height={parseInt(icon.height.toString(), 10)}
              src={icon.src}
              width={parseInt(icon.width.toString(), 10)}
            />
          </div>
        )) ||
        (icon && (
          <div className={stylex(styles.icon)}>
            <CometIcon color="secondary" icon={icon} />
          </div>
        )) ||
        (emojiSkittle && (
          <div className={stylex(styles.emoji)}>{emojiSkittle}</div>
        ))
      }
      auxContent={PasswordIcon ?? auxContent}
      children={({ focused, helperTextID, id }) => (
        <BaseTextInput
          aria-describedby={helperTextID}
          aria-invalid={normalTopResultType === "ERROR"}
          autoComplete={autoComplete}
          autoFocus={autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD}
          disabled={disabled}
          id={id}
          inputMode={inputMode}
          maxLength={maxLength}
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          onValueChange={onValueChange}
          placeholder={focused ? placeholder : null}
          readOnly={readOnly}
          ref={ref}
          suppressFocusRing={true}
          testid={undefined}
          type={typeAfterChange}
          value={value}
          xstyle={[
            styles.input,
            disabled && styles.disabled,
            readOnly && readOnly === true && styles.readOnly,
            xstyle,
          ]}
          {...rest}
        />
      )}
      cursor="text"
      disabled={disabled}
      helperText={topResultReason ?? helperText}
      helperTextIsHidden={helperTextIsHidden}
      label={label}
      labelRef={labelRef}
      suppressFocusRing={suppressFocusRing}
      validationState={normalTopResultType}
      value={value}
    />
  );
});
