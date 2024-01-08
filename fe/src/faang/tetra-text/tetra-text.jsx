/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { CometTextContext, CometTextLangContext } from "@/faang/context";

import { BaseHeading } from "./base-heading";
import {
  BaseTextContextProvider,
  useBaseTextContext,
} from "./base-text-context";
import { CometDensityModeContext } from "./comet-density-mode-context";
import { CometLineClamp } from "./comet-line-clamp";
import { CometTextTypography } from "./comet-text-typography";

const e = {
  useTranslationKeyForTextParent: function () {},
};

const { useTranslationKeyForTextParent } = e;

const styles = stylex.create({
  //
  apple: {
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    fontFamily: "var(--font-family-apple)",
  },

  base: {
    maxWidth: "100%",
    minWidth: 0,
    wordBreak: "break-word",
    wordWrap: "break-word",
  },

  block: {
    "::after": {
      content: '""',
      display: "block",
      height: 0,
    },

    "::before": {
      content: '""',
      display: "block",
      height: 0,
    },

    display: "block",
  },

  default: { fontFamily: "var(--font-family-default)" },

  heading: {
    maxWidth: "100%",
    minWidth: 0,
  },

  preserveNewLines: { whiteSpace: "pre-line" },

  segoe: { fontFamily: "var(--font-family-segoe)" },
});

const alignStyles = stylex.create({
  center: { textAlign: "center" },

  end: { textAlign: "end" },

  start: { textAlign: "start" },
});

const buttonColorStyles = stylex.create({
  blueLink: { color: "var(--blue-link)" },
  disabled: { color: "var(--disabled-text)" },
  disabledButton: { color: "var(--disabled-button-text)" },
  highlight: { color: "var(--accent)" },
  negative: { color: "var(--negative)" },
  placeholder: { color: "var(--placeholder-text)" },
  positive: { color: "var(--positive)" },
  primary: { color: "var(--primary-text)" },
  primaryButton: { color: "var(--primary-button-text)" },
  primaryDeemphasizedButton: {
    color: "var(--primary-deemphasized-button-text)",
  },
  primaryOnMedia: { color: "var(--primary-text-on-media)" },
  secondary: { color: "var(--secondary-text)" },
  secondaryButton: { color: "var(--secondary-button-text)" },
  secondaryOnMedia: { color: "var(--secondary-text-on-media)" },
  tertiary: { color: "var(--placeholder-text)" },
  white: { color: "var(--always-white)" },
});

const defaultFontSizeStyles = stylex.create({
  12: {
    fontSize: ".75rem",
    lineHeight: "1.3333",
  },
  13: {
    fontSize: " .8125rem",
    lineHeight: "1.2308",
  },
  14: {
    fontSize: ".875rem",
    lineHeight: "1.2857",
  },
  15: {
    fontSize: ".9375rem",
    lineHeight: "1.3333",
  },
  16: {
    fontSize: "1rem",
    lineHeight: "1.25",
  },
  17: {
    fontSize: "1.0625rem",
    lineHeight: "1.1765",
  },
  20: {
    fontSize: "1.25rem",
    lineHeight: "1.2",
  },
  24: {
    fontSize: "1.5rem",
    lineHeight: "1.1667",
  },
  28: {
    fontSize: "1.75rem",
    lineHeight: "1.1429",
  },
  32: {
    fontSize: "2rem",
    lineHeight: " 1.1875",
  },
});

const densityModeFontStyles = stylex.create({
  12: {
    fontSize: ".75rem",
    lineHeight: "1.3333",
  },
  13: {
    fontSize: ".75rem",
    lineHeight: "1.2308",
  },
  15: {
    fontSize: ".875rem",
    lineHeight: "1.3333",
  },
  17: {
    fontSize: "1rem",
    lineHeight: "1.1765",
  },
  20: {
    fontSize: "1.25rem",
    lineHeight: "1.2",
  },
  24: {
    fontSize: "1.5rem",
    lineHeight: "1.1667",
  },
  28: {
    fontSize: "1.75rem",
    lineHeight: "1.1429",
  },
  32: {
    fontSize: "2rem",
    lineHeight: "1.1875",
  },
});

const fontWeightStyles = stylex.create({
  bold: { fontWeight: 700 },
  medium: { fontWeight: 500 },
  normal: { fontWeight: 400 },
  semibold: { fontWeight: 600 },
});

const nestedBeforeOffsetStyles = stylex.create({
  1: { "::before": { marginTop: "-1px" } },
  10: { "::before": { marginTop: "-10px" } },
  2: { "::before": { marginTop: "-2px" } },
  3: { "::before": { marginTop: "-3px" } },
  4: { "::before": { marginTop: "-4px" } },
  5: { "::before": { marginTop: "-5px" } },
  6: { "::before": { marginTop: "-6px" } },
  7: { "::before": { marginTop: "-7px" } },
  8: { "::before": { marginTop: "-8px" } },
  9: { "::before": { marginTop: "-9px" } },
});

const nestedAfterOffsetStyles = stylex.create({
  1: { "::after": { marginBottom: "-1px" } },
  10: { "::after": { marginBottom: "-10px" } },
  2: { "::after": { marginBottom: "-2px" } },
  3: { "::after": { marginBottom: "-3px" } },
  4: { "::after": { marginBottom: "-4px" } },
  5: { "::after": { marginBottom: "-5px" } },
  6: { "::after": { marginBottom: "-6px" } },
  7: { "::after": { marginBottom: "-7px" } },
  8: { "::after": { marginBottom: "-8px" } },
  9: { "::after": { marginBottom: "-9px" } },
});

const offsetValueStyles = stylex.create({
  1: { paddingBottom: "1px" },
  2: { paddingBottom: "2px" },
  3: { paddingBottom: "3px" },
});

const hyphensStyles = stylex.create({
  auto: {
    hyphens: "auto",
  },
  manual: {
    hyphens: "manual",
  },
});

const BUTTON_TYPE = {
  disabled: "disabledButton",
  highlight: "primaryDeemphasizedButton",
  secondary: "secondaryButton",
  white: "primaryButton",
};

function getTypoColor(color, type) {
  if (type) {
    // Check if the type is present in BUTTON_TYPE, otherwise use the provided color
    // eslint-disable-next-line no-return-assign, no-cond-assign
    return (type = BUTTON_TYPE[color]) ? type : color;
  } else {
    // If no type provided, use the given color directly
    return color;
  }
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").TetraTextProps>
 */
export const TetraText = forwardRef((props, ref) => {
  const {
    align = "auto",
    children,
    color,
    dir = "auto",
    hyphens = "none",
    id,
    isPrimaryHeading = false,
    isSemanticHeading = false,
    numberOfLines,
    preserveNewLines = false,
    suppressHydrationWarning,
    type,
    truncationTooltip,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [densityMode, _] = useContext(CometDensityModeContext);

  const textLang = useContext(CometTextLangContext);
  const {
    fontFamily,
    fontSize,
    defaultColor = "primary",
    fontWeight = "normal",
    offsets = [0, 0],
  } = CometTextTypography[type];

  const offsetsValue = offsets.length === 3 ? offsets[2] : 0;

  const key = useTranslationKeyForTextParent();

  const typoColor = getTypoColor(
    color ?? defaultColor,
    type === "button1" || type === "button2"
  );

  const CometTextContextValue = useMemo(() => {
    return { color: typoColor, type };
  }, [typoColor, type]);

  const baseTextContextValue = useBaseTextContext();

  const nested =
    (!baseTextContextValue ? undefined : baseTextContextValue.nested) === true;

  const textChild = (
    <BaseTextContextProvider nested={true}>
      <CometTextContext.Provider value={CometTextContextValue}>
        <span
          key={key}
          className={stylex(
            styles.base,
            fontFamily,
            !nested && styles.block,
            // @ts-ignore
            !nested && nestedBeforeOffsetStyles[offsets[0]],
            !nested && styles.block,
            !nested &&
              nestedAfterOffsetStyles[
                numberOfLines !== undefined
                  ? offsets[1] + offsetsValue
                  : offsets[1]
              ],
            densityMode
              ? densityModeFontStyles[fontSize]
              : defaultFontSizeStyles[fontSize],
            fontWeightStyles[fontWeight],
            buttonColorStyles[typoColor],
            align !== "auto" && alignStyles[align],
            hyphens !== "none" && hyphensStyles[hyphens],
            preserveNewLines && styles.preserveNewLines
          )}
          lang={textLang}
          dir={nested ? undefined : dir}
          id={id}
          ref={ref}
          suppressHydrationWarning={suppressHydrationWarning}
          data-testid={undefined}
        >
          {numberOfLines ? (
            <CometLineClamp
              lines={numberOfLines}
              truncationTooltip={truncationTooltip}
              xstyle={offsetsValue !== true && offsetValueStyles[offsetsValue]}
            >
              {children}
            </CometLineClamp>
          ) : (
            children
          )}
        </span>
      </CometTextContext.Provider>
    </BaseTextContextProvider>
  );

  return isSemanticHeading ? (
    <BaseHeading isPrimaryHeading={isPrimaryHeading} xstyle={styles.heading}>
      {textChild}
    </BaseHeading>
  ) : (
    textChild
  );
});

TetraText.displayName = "TetraText";
