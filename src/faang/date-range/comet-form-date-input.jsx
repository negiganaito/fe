/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { datePickerUtils } from "../abstract-calendar";
import { BaseContextualLayer } from "../base-contextual-layer";
import {
  CometComponentWithKeyCommands,
  CometKeys,
} from "../commet-key-commands";
import { JSScheduler } from "../common";
import { CometHideLayerOnEscape } from "../dialog";
import { FocusWithinHandler } from "../focus";
import { FocusManager, FocusRegion, focusScopeQueries } from "../focus-region";
import { BaseTextInput, CometFormInputWrapper } from "../form";
import { useComboboxKeyConfig, useOnOutsideClick } from "../hooks";
import { CometIcon, fbicon } from "../icon";
import { CometPopover } from "../popover";
import { ix } from "../utils";

import { CometFormDateInputUtils } from "./comet-form-date-input-utils";

const e = stylex.create({
  calendar: {
    padding: "16px",
    width: "268px",
  },
  disabled: {
    color: "var(--disabled-text)",
    cursor: "not-allowed",
  },
  input: {
    backgroundColor: "transparent",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",

    boxSizing: "border-box",
    color: "var(--primary-text)",
    fontSize: "1rem",
    fontWeight: "normal",
    lineHeight: "1.25",
    paddingBottom: "10px",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "26px",
    width: "100%",
  },
  labelOutsideVerticalPadding: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  primaryIcon: {
    paddingLeft: "16px",
    paddingTop: "18px",
    pointerEvents: "none",
  },
});

const b = stylex.create({
  input: {
    backgroundColor: "transparent",
    borderTopWidth: null,
    borderRightWidth: null,
    borderBottomWidth: null,
    borderLeftWidth: null,
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    borderTopColor: null,
    borderRightColor: null,
    borderBottomColor: null,
    borderLeftColor: null,
    boxSizing: "border-box",
    color: "var(--primary-text)",
    fontSize: "1rem",
    fontWeight: "normal",
    lineHeight: "1.25",
    paddingBottom: "10px",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "26px",
    width: "100%",
  },
});

const _4855 = false;

const styles = _4855 ? { ...e, ...b } : e;

const v = [];

export const CometFormDateInput = (props) => {
  const {
    alwaysShrinkLabel,
    ariaLabel,
    constraints = v,
    date,
    dateFormatter,
    disabled = false,
    helperText,
    hideIcon = false,
    icon: _icon,
    initialCalendarDate,
    label,
    labelLocation_INTERNAL,
    onBlur,
    onDateChange,
    onFocus,
    placeholder,
    // eslint-disable-next-line no-unused-vars
    testid,
    // eslint-disable-next-line no-unused-vars
    selectorTestId,
    validationState,
    externalCalendarRef,
  } = props;

  const icon = !_icon ? fbicon._(ix(481127), 20) : _icon;

  const [J, aa] = useState(() => {
    return datePickerUtils.maybeFormatDate(date, dateFormatter);
  });

  const K = labelLocation_INTERNAL === "outside";

  const [L, M] = useState(false);

  const N = useRef(null);
  const O = useRef(null);

  const [ba, P] = useState(false);

  const Q = useRef(true);
  const R = useId();

  const S = useCallback((a) => {
    aa(a);
    Q.current = !1;
  }, []);

  const T = useCallback(
    (a) => {
      if (
        date === a ||
        (a &&
          (!a.isValid() ||
            !constraints.every((b) => {
              return b(a);
            })))
      ) {
        S(datePickerUtils.maybeFormatDate(date, dateFormatter));
        Q.current = !0;
        return;
      }
      onDateChange(a);
    },
    [constraints, date, dateFormatter, onDateChange, S]
  );

  const U = useCallback(() => {
    if (Q.current === !1) {
      if (J === "") {
        T(null);
        return;
      }
      let a = CometFormDateInputUtils.parseStringToDate(J);
      if (
        a &&
        a.isValid() &&
        constraints.every((b) => {
          return b(a);
        })
      ) {
        T(a);
        return;
      }
    }
    T(date);
  }, [constraints, date, J, T]);

  const V = useCallback(() => {
    return M(true);
  }, []);

  const W = useCallback(() => {
    P(false);
    M(false);
  }, []);

  const X = useCallback(() => {
    JSScheduler.defer(() => {
      O.current && FocusManager.focusElement(O.current);
    });
  }, []);

  const Y = useRef(date);
  const Z = useRef(dateFormatter);

  useEffect(() => {
    if (date !== Y.current || dateFormatter !== Z.current) {
      S(datePickerUtils.maybeFormatDate(date, dateFormatter));
      Q.current = !0;
    }

    Y.current = date;
    Z.current = dateFormatter;

    // (date !== Y.current || dateFormatter !== Z.current) &&
    //   (S(datePickerUtils.maybeFormatDate(date, dateFormatter)),
    //   (Q.current = !0)),
    //   (Y.current = k),
    //   (Z.current = w);
  }, [date, dateFormatter, S]);

  const a = useCallback(() => {
    L || V();
    X();
  }, [X, L, V]);

  const ca = useCallback(
    (a) => {
      W();
      onDateChange(a);
    },
    [onDateChange, W]
  );

  const $ = useCallback(
    (a) => {
      a || (W(), U());
    },
    [W, U]
  );

  const da = function (a) {
    a.target !== N.current && W();
  };

  const ea = useComboboxKeyConfig(X, L, W, V, U, S);

  const fa = useMemo(() => {
    return [
      {
        command: {
          key: CometKeys.DOWN,
        },
        description: fbt.c("Show calendar"),
        handler: function () {
          V();
          X();
        },
      },
      {
        command: {
          key: CometKeys.UP,
        },
        description: fbt.c("Show calendar"),
        handler: function () {
          V();
          X();
        },
      },
      {
        command: {
          alt: !0,
          key: CometKeys.DOWN,
        },
        description: fbt.c("Show calendar"),
        handler: V,
        isHiddenCommand: !0,
      },
      {
        command: {
          alt: !0,
          key: CometKeys.UP,
        },
        description: fbt.c("Close calendar"),
        handler: W,
        isHiddenCommand: !0,
      },
    ];
  }, [X, W, V]);

  const B = label ?? fbt.c("Date");
  const e = ariaLabel ?? fbt.c("Choose Date");

  const ga = useOnOutsideClick(da);

  useImperativeHandle(
    externalCalendarRef,
    () => {
      return {
        hideCalendar: function () {
          $(!1);
        },
        showCalendar: function () {
          JSScheduler.defer(() => {
            FocusManager.focusElement(N.current);
            V();
          });
        },
      };
    },
    [$, V]
  );

  return (
    <CometFormInputWrapper
      addOnStart={
        hideIcon ? undefined : (
          <CometComponentWithKeyCommands
            commandConfigs={fa}
            xstyle={[
              styles.primaryIcon,
              K && styles.labelOutsideVerticalPadding,
            ]}
          >
            <CometIcon
              aria-controls={L ? R : undefined}
              aria-expanded={L}
              aria-label={
                date
                  ? fbt.c("{label}, Selected: {date}", [
                      fbt.param("label", e),
                      fbt.param(
                        "date",
                        datePickerUtils.maybeFormatDate(date, dateFormatter)
                      ),
                    ])
                  : e
              }
              color="secondary"
              icon={icon}
              onPress={a}
              testid={undefined}
            />
          </CometComponentWithKeyCommands>
        )
      }
      alwaysShrinkLabel={alwaysShrinkLabel}
      ariaLabel={e}
      cursor="text"
      disabled={disabled}
      helperText={helperText}
      label={B}
      labelLocation_INTERNAL={labelLocation_INTERNAL}
      onFocusChange={$}
      suppressFocusRing={ba}
      validationState={validationState}
      value={J}
      children={({ focused, helperTextID, id, rootRef }) => {
        return (
          <>
            <CometComponentWithKeyCommands commandConfigs={ea}>
              <BaseTextInput
                aria-autocomplete="none"
                aria-controls={L ? R : void 0}
                aria-describedby={helperTextID}
                aria-expanded={L}
                aria-invalid={validationState === "ERROR"}
                disabled={disabled}
                id={id}
                onBlur={onBlur}
                onClick={V}
                onFocus={onFocus}
                onValueChange={S}
                placeholder={focused || K ? placeholder : void 0}
                ref={N}
                role="combobox"
                suppressFocusRing
                testid={void 0}
                value={J}
                xstyle={[
                  styles.input,
                  K && styles.labelOutsideVerticalPadding,
                  disabled && styles.disabled,
                ]}
              />
            </CometComponentWithKeyCommands>
            {L && (
              <BaseContextualLayer
                align="start"
                contextRef={a}
                position="bellow"
                ref={ga}
              >
                <CometHideLayerOnEscape onHide={W}>
                  <FocusRegion.FocusRegion
                    autoRestoreFocus
                    containFocusQuery={focusScopeQueries.tabbableScopeQuery}
                  >
                    <FocusWithinHandler onFocusChange={P}>
                      <CometPopover
                        id={R}
                        label={fbt.c("Choose Date")}
                        testid={undefined}
                      >
                        <div className={stylex(styles.calendar)}>
                          <CometFormCalendarPager
                            constraints={constraints}
                            initialCalendarDate={initialCalendarDate}
                            onSelected={ca}
                            ref={O}
                            selectedDates={date ? [date] : []}
                          />
                        </div>
                      </CometPopover>
                    </FocusWithinHandler>
                  </FocusRegion.FocusRegion>
                </CometHideLayerOnEscape>
              </BaseContextualLayer>
            )}
          </>
        );
      }}
    />
  );
};
