/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { stylex } from "@stylexjs/stylex";
import React, { forwardRef } from "react";
// @ts-ignore
import { jsx } from "react/jsx-runtime";

import { RecoverableViolationWithComponentStack } from "@/faang/error";
import { testID, xplatToDOMRef } from "@/faang/utils";

import { BaseImage } from "./base-image";
import { coerceImageishSprited } from "./coerce-imageish-sprited";
import { coerceImageishURL } from "./coerce-imageish-URL";
import { CometSSRBackgroundImageUtils } from "./comet-ssr-background-image-utils";
import { CometVisualCompletionAttributes } from "@/faang/common";

// type CometImageFromIXValueProps = {
//   alt?: string
//   objectFit?: string
//   source?: any
//   xstyle?: string
//   testid?: string
// }

export const CometImageFromIXValue = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { alt = "", objectFit, source, testid, xstyle } = props;

  CometSSRBackgroundImageUtils.processSpritedImagesForSSRPreload(source);

  const spriteImageish = coerceImageishSprited(source);

  if (spriteImageish) {
    const classes = stylex(xstyle);

    return jsx("i", {
      // c('CometVisualCompletionAttributes').CSS_IMG,
      // c('testID')(i),
      ...CometVisualCompletionAttributes.CSS_IMG,
      ...testID(testid),
      "aria-label": alt === "" ? null : alt,
      className:
        spriteImageish.type === "css"
          ? classes !== ""
            ? String(spriteImageish.className) + classes
            : spriteImageish.className
          : classes,
      ref,
      role: alt === "" ? null : "img",
      style:
        spriteImageish.type === "cssless" ? spriteImageish.style : undefined,
    });
  }

  const imageOption = coerceImageishURL(source);

  if (imageOption) {
    const { height, width, uri } = imageOption;

    return jsx(BaseImage, {
      alt,
      draggable: false,
      height: objectFit === "cover" ? "100%" : height,
      objectFit,
      ref: xplatToDOMRef.xplatToDOMRef(ref),
      src: uri,
      testid: undefined,
      width: objectFit === "cover" ? "100%" : width,
      xstyle,
    });
  }

  return (
    <RecoverableViolationWithComponentStack
      errorMessage="asset provided to CometImageFromIXValue cannot be transformed by Haste"
      projectName="comet_ui"
    />
  );

  // return jsx(RecoverableViolationWithComponentStack, {
  //   errorMessage:
  //     "asset provided to CometImageFromIXValue cannot be transformed by Haste",
  //   projectName: "comet_ui",
  // });
});

CometImageFromIXValue.displayName = "CometImageFromIXValue.react";
