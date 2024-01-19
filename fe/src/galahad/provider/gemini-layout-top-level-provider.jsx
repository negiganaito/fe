/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { BaseDocumentScrollView } from "@/faang/modal/base-document-scroll-view";

export const GeminiLayoutTopLevelProvider = ({ children }) => {
  return (
    <BaseDocumentScrollView
      contextKey="elem"
      maintainScrollForContext
      resetScrollOnMount={false}
    >
      {children}
    </BaseDocumentScrollView>
  );
};
