/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { FBLogger } from "@/faang/error";

function CometTransientDialogProvider() {
  FBLogger("comet_ui")
    .blameToPreviousFrame()
    .mustfix(
      "Attempted to imperatively render a dialog without CometTransientDialogProvider in the tree. This is not allowed. Please add a CometTransientDialogProvider to render a dialog (https://fburl.com/dialog-provider)."
    );
}

export const CometDialogContext = React.createContext(
  CometTransientDialogProvider
);
