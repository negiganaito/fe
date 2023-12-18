/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo } from 'react'

import { validateBaseInput } from '@/faang/utils'

import { useIsPristineValue } from './use-is-pristine-value'

export function useBaseInputValidators(props) {
  const { isInitialValuePristine = true, validator, value } = props
  const isPristine = useIsPristineValue(value, isInitialValuePristine)

  return useMemo(
    () => validateBaseInput(isPristine, value, validator),
    [isPristine, validator, value],
  )
}
