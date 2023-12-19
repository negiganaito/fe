/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { processBaseInputValidators } from './process-base-input-validators'

export function validateBaseInput(
  isPristine,
  value,
  validator,
) {
  const allResults =
    validator !== null && !isPristine
      ? processBaseInputValidators(value, validator)
      : []
  if (allResults.length === 0)
    return {
      allResults: allResults,
      topResultReason: null,
      topResultType: 'CORRECT',
    }
  const hasError = allResults.some((result) => {
    return result.type === 'ERROR'
  })
  const topResultType =
    (value = allResults.find((result) => {
      return result.type === (hasError ? 'ERROR' : 'WARN')
    })) !== null
      ? value
      : null
  return {
    allResults: allResults,
    topResultReason:
      topResultType !== null && topResultType.reason !== null
        ? topResultType.reason
        : null,
    topResultType: topResultType !== null ? topResultType.type : 'CORRECT',
  }
}
