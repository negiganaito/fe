/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { jsx } from "react/jsx-runtime";

import { TetraTextPairing } from "@/faang/tetra-text-pairing";

export function CometFormInputWrapperHelperText(props) {
  const { validationState, value } = props;

  return jsx(TetraTextPairing, {
    level: 4,
    meta: value,
    metaColor: validationState === "ERROR" ? "negative" : "secondary",
  });
}
