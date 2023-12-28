/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
- CometSelect
  - CometIcon
  - CometPressable
  - CometScreenReaderText
  - CometSelectMenuTrigger
  - TetraText
  - fbicon
 */

import React, { useMemo } from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { CometSelectMenuTrigger } from "@/faang/popover";

import { CometScreenReaderText } from "../common";
import { CometIcon, fbicon } from "../icon";
import { CometPressable } from "../pressable";
import { TetraText } from "../tetra-text";
import { ix } from "../utils";

const styles = stylex.create({
  button: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "var(--secondary-button-background)",
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
    cursor: "pointer",
    justifyContent: "space-between",
    margin: "0",
    padding: "10px 12px 10px 12px",
    position: "relative",
    textAlign: "left",
    zIndex: "0",
  },
  buttonDisabled: {
    cursor: "not-allowed",
  },
  buttonExpanded: {
    minWidth: "100%",
  },
  icon: {
    lineHeight: "0",
    marginLeft: "8px",
  },
  leftIcon: {
    lineHeight: "0",
    marginRight: "8px",
  },

  d1: {
    lineHeight: 0,
    marginRight: "8px",
  },

  d2: {
    lineHeight: 0,
    marginLeft: "8px",
  },
});

export const CometSelect = (props) => {
  const {
    "aria-describedby": ad,
    "aria-label": al,
    // eslint-disable-next-line no-unused-vars
    aux,
    defaultLabel,
    disabled = false,
    displayValue,
    expanded = false,
    focusable = true,
    icon,
    labelLineLimit,
    // eslint-disable-next-line no-unused-vars
    testid,
    ...rest
  } = props;

  const formattedDisplayValue = useMemo(() => {
    if (!displayValue) {
      return null;
    }
    let option = rest.options.find((a) => {
      return a.value === rest.selectedValue;
    });
    if (!option) {
      return null;
    }
    return typeof option.label === "string" || fbt.isFbtInstance(option.label)
      ? displayValue([option.value, option.label])
      : null;
  }, [displayValue, rest.options, rest.selectedValue]);

  const label = useMemo(() => {
    // let a;
    // let b = rest.options.find((a) => {
    //   return a.value === rest.selectedValue;
    // });
    // // eslint-disable-next-line no-return-assign
    // return (a = formattedDisplayValue) !== null
    //   ? a
    //   : b !== null
    //   ? b.label
    //   : (a = defaultLabel) !== null
    //   ? a
    //   : "";

    const selectedOption = rest.options.find(
      (opt) => opt.value === rest.selectedValue
    );
    return (
      formattedDisplayValue ||
      (selectedOption ? selectedOption.label : defaultLabel) ||
      ""
    );
  }, [defaultLabel, formattedDisplayValue, rest.options, rest.selectedValue]);

  return (
    <CometSelectMenuTrigger
      {...rest}
      disabled={disabled}
      children={(a, { xstyle, ...f }) => {
        return (
          <CometPressable
            {...f}
            aria-describedby={ad}
            aria-haspopup="listbox"
            expanding
            focusable={focusable}
            ref={a}
            testid={undefined}
            xstyle={[
              styles.button,
              expanded && styles.buttonExpanded,
              disabled && styles.buttonDisabled,
              xstyle,
            ]}
          >
            {icon && (
              <div className={stylex(styles.d1)}>
                <CometIcon
                  {...icon}
                  color={disabled ? "disabled" : "primary"}
                />
              </div>
            )}
            {al && <CometScreenReaderText text={al} />}
            <TetraText
              color={disabled ? "disabled" : null}
              numberOfLines={labelLineLimit}
              type="bodyLink3"
            >
              {label}
            </TetraText>
            <div className={stylex(styles.d2)}>
              <CometIcon
                color={disabled ? "disabled" : "primary"}
                icon={fbicon._(ix(481882), 16)}
              />
            </div>
          </CometPressable>
        );
      }}
    />
  );
};
