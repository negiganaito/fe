/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/*

- "CometFormTextArea.react", 
  - "BaseTextArea.react"
  - "CometFormInputWrapper.react"
  - "gkx"
  - "react"
  - "useBaseInputValidators"]

*/
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import { CometFormInputWrapper } from "../form";
import { useBaseInputValidators } from "../hooks";

import { BaseTextArea } from "./base-text-area";

const styles = stylex.create({
  disabled: {
    color: "var(--disabled-text)",
    cursor: "not-allowed",
  },
  hideLabel: {
    marginTop: "10px",
  },
  textArea: {
    backgroundColor: "transparent",
    borderStyle: "none",
    boxSizing: "border-box",
    color: "var(--primary-text)",
    display: "flex",
    fontSize: "1rem",
    fontWeight: "normal",
    lineHeight: "1.25",
    marginBottom: "10px",
    marginTop: "26px",
    outline: "none",
    overflowX: "hidden",
    overflowY: "hidden",
    paddingRight: "16px",
    paddingLeft: "16px",
    resize: "none",
    width: "100%",
  },
});

export const CometFormTextArea = forwardRef(
  (
    {
      addOnBottom,
      autoComplete,
      auxContent,
      describedBy,
      disabled = false,
      helperText,
      hideLabel = false,
      label,
      maxLength,
      maxRows,
      minRows,
      onBlur,
      onFocus,
      onValueChange,
      placeholder,
      suppressFocusRing,
      testid,
      validationState,
      validator,
      value,
    },
    ref
  ) => {
    const { topResultReason, topResultType } = useBaseInputValidators({
      validator,
      value: value ?? "",
    });

    let _validationState =
      topResultType !== "CORRECT" ? topResultType : validationState;

    return (
      <CometFormInputWrapper
        addOnBottom={addOnBottom}
        auxContent={auxContent}
        cursor="text"
        disabled={disabled}
        helperText={topResultReason ?? helperText}
        hideLabel={hideLabel}
        label={label}
        suppressFocusRing={suppressFocusRing}
        validationState={_validationState}
        value={value}
        children={({ focused, helperTextID, id }) => {
          return (
            <BaseTextArea
              aria-describedby={
                !describedBy
                  ? helperTextID
                  : !helperTextID
                  ? describedBy
                  : helperTextID + " " + describedBy
              }
              aria-invalid={_validationState === "ERROR"}
              autoComplete={autoComplete}
              disabled={disabled}
              id={id}
              maxLength={maxLength}
              maxRows={maxRows}
              minRows={minRows}
              onBlur={onBlur}
              onFocus={onFocus}
              onValueChange={onValueChange}
              placeholder={focused ? placeholder : null}
              ref={ref}
              suppressFocusRing
              testid={undefined}
              value={value}
              xstyle={[
                styles.textArea,
                disabled && styles.disabled,
                hideLabel && styles.hideLabel,
              ]}
            />
          );
        }}
      />
    );

    // return jsx(CometFormInputWrapper, {
    //   addOnBottom,
    //   auxContent,
    //   cursor: "text",
    //   disabled,
    //   helperText: topResultReason ?? helperText,
    //   hideLabel,
    //   label,
    //   suppressFocusRing,
    //   validationState: _validationState,
    //   value,
    //   children: ({ focused, helperTextID, id }) => {
    //     // const { focused, helperTextID, id } = param

    //     return jsx(BaseTextArea, {
    //       "aria-describedby": !describedBy
    //         ? helperTextID
    //         : !helperTextID
    //         ? describedBy
    //         : helperTextID + " " + describedBy,
    //       "aria-invalid": _validationState === "ERROR",
    //       autoComplete,
    //       disabled,
    //       id,
    //       maxLength,
    //       maxRows,
    //       minRows,
    //       onBlur,
    //       onFocus,
    //       onValueChange,
    //       placeholder: focused ? placeholder : null,
    //       ref,
    //       suppressFocusRing: true,
    //       testid: undefined,
    //       value,
    //       className: mergeClasses(
    //         classes.textArea,
    //         disabled && classes.disabled,
    //         hideLabel && classes.hideLabel
    //       ),
    //     });
    //   },
    // });
  }
);
