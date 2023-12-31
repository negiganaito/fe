/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export type TetraTextProps = {
  align?: "center" | "end" | "start" | "auto";
  children?: ReactNode;
  color?:
    | "blueLink"
    | "disabled"
    | "disabledButton"
    | "highlight"
    | "negative"
    | "placeholder"
    | "positive"
    | "primary"
    | "primaryButton"
    | "primaryDeemphasizedButton"
    | "primaryOnMedia"
    | "secondary"
    | "secondaryButton"
    | "secondaryOnMedia"
    | "tertiary"
    | "white";
  dir?: "ltr" | "rtl" | "auto";
  id?: string;
  isPrimaryHeading?: boolean;
  isSemanticHeading?: boolean;
  numberOfLines?: number;
  preserveNewLines?: boolean;
  suppressHydrationWarning?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  truncationTooltip?: any;
  type?:
    | "body1"
    | "body2"
    | "body3"
    | "body4"
    | "bodyLink1"
    | "bodyLink2"
    | "bodyLink3"
    | "bodyLink4"
    | "button1"
    | "button2"
    | "entityHeaderHeadline1"
    | "entityHeaderHeadline2"
    | "entityHeaderMeta1"
    | "entityHeaderMeta2"
    | "headline3"
    | "headline4"
    | "headlineDeemphasized3"
    | "headlineDeemphasized4"
    | "headlineEmphasized1"
    | "headlineEmphasized2"
    | "headlineEmphasized3"
    | "headlineEmphasized4"
    | "meta1"
    | "meta2"
    | "meta3"
    | "meta4";
  hyphens?: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export type TetraTextPairingProps = {
  body?: any;
  bodyColor?:
    | "blueLink"
    | "disabled"
    | "disabledButton"
    | "highlight"
    | "negative"
    | "placeholder"
    | "positive"
    | "primary"
    | "primaryButton"
    | "primaryDeemphasizedButton"
    | "primaryOnMedia"
    | "secondary"
    | "secondaryButton"
    | "secondaryOnMedia"
    | "tertiary"
    | "white";
  bodyLineLimit?: number;
  bodyRef?: any;
  bodyTruncationTooltip?: any;
  dir?: any;

  headline?: any;
  headlineAddOn?: any;
  headlineColor?:
    | "blueLink"
    | "disabled"
    | "disabledButton"
    | "highlight"
    | "negative"
    | "placeholder"
    | "positive"
    | "primary"
    | "primaryButton"
    | "primaryDeemphasizedButton"
    | "primaryOnMedia"
    | "secondary"
    | "secondaryButton"
    | "secondaryOnMedia"
    | "tertiary"
    | "white";
  headlineLineLimit?: number;
  headlineRef?: any;
  headlineTruncationTooltip?: any;
  isPrimaryHeading?: boolean;
  isSemanticHeading?: boolean;
  level: number | string;
  meta?: any;
  metaColor?:
    | "blueLink"
    | "disabled"
    | "disabledButton"
    | "highlight"
    | "negative"
    | "placeholder"
    | "positive"
    | "primary"
    | "primaryButton"
    | "primaryDeemphasizedButton"
    | "primaryOnMedia"
    | "secondary"
    | "secondaryButton"
    | "secondaryOnMedia"
    | "tertiary"
    | "white";
  metaLineLimit?: number;
  metaLocation?: string;
  metaRef?: any;
  metaTestID?: string;
  metaTruncationTooltip?: any;
  reduceEmphasis?: boolean;
  testid?: string;
  textAlign?: "auto" | "start" | "center" | "end";
};

export type CometHeadlineWithAddOnProps = {
  addOn?: ReactNode;
  children?: ReactNode;
  color?:
    | "blueLink"
    | "disabled"
    | "disabledButton"
    | "highlight"
    | "negative"
    | "placeholder"
    | "positive"
    | "primary"
    | "primaryButton"
    | "primaryDeemphasizedButton"
    | "primaryOnMedia"
    | "secondary"
    | "secondaryButton"
    | "secondaryOnMedia"
    | "tertiary"
    | "white";
  headlineRef?: any;
  isPrimaryHeading?: boolean;
  isSemanticHeading?: boolean;
  numberOfLines?: number;
  type: TypeKeys;
};
