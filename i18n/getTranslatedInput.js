'use strict';

// import type { FbtRuntimeCallInput, FbtTranslatedInput } from 'fbt/lib/FbtHooks';

import FbtI18nNativeAssets from './FbtI18nNativeAssets';

/**
 *
 * @param {FbtRuntimeCallInput} input
 * @returns {FbtTranslatedInput}
 */
function getTranslatedInput(input) {
  const { options } = input;
  if (options.hk != null) {
    let translatedPayload = FbtI18nNativeAssets.getString(options.hk);
    if (translatedPayload) {
      return { table: translatedPayload, args: input.args };
    }
  }
  return null;
}

export { getTranslatedInput };

// https://github.com/vonovak/i18n-demo/blob/main/i18n/FbtI18nNativeAssets.js
