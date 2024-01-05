/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";

import { CometListCellStrict } from "@/faang/popover";

export const TetraListCell = forwardRef((props, ref) => {
  const {
    addOnPrimary,
    addOnPrimaryCssSelectionId,
    addOnPrimaryDisabled,
    addOnPrimaryOverrideVerticalStyle,
    addOnPrimaryTestId,
    addOnPrimaryVerticalAlign,
    addOnSecondary,
    addOnSecondaryDisabled,
    addOnSecondaryRef,
    addOnSecondaryTestId,
    addOnSecondaryVerticalAlign,
    ...rest
  } = props;

  return (
    <CometListCellStrict
      addOnEnd={addOnSecondary}
      addOnEndDisabled={addOnSecondaryDisabled}
      addOnEndRef={addOnSecondaryRef}
      addOnEndTestId={addOnSecondaryTestId}
      addOnEndVerticalAlign={addOnSecondaryVerticalAlign}
      addOnStart={addOnPrimary}
      addOnStartCssSelectionId={addOnPrimaryCssSelectionId}
      addOnStartDisabled={addOnPrimaryDisabled}
      addOnStartOverrideVerticalStyle={addOnPrimaryOverrideVerticalStyle}
      addOnStartTestId={addOnPrimaryTestId}
      addOnStartVerticalAlign={addOnPrimaryVerticalAlign}
      {...rest}
      ref={ref}
    />
  );
});
