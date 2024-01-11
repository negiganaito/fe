/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { GeminiVariantState } from "@/galahad/config/gemini-variant-state";

const useGeminiLayoutUserSettingsFullWidthMode = () => {
  const { hasRiverKnight } = GeminiVariantState.useGeminiVariant();

  return hasRiverKnight !== true;
};

export const GeminiLayoutFullWidthModeContext = {
  useGeminiLayoutUserSettingsFullWidthMode,
};
