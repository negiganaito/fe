/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */


/* FB_PKG_DELIM */
import React, { useState } from 'react';

import { CometFormTextInput } from '@/faang/form';

/**
 * @typedef {Object} WorkSigninPasswordTextBoxProps
 * @property {boolean} [autoFocus] - Indicates whether the password text box should receive focus.
 * @property {string} [dataTestId] - Test identifier for testing purposes.
 * @property {boolean} [disabled] - Indicates whether the password text box is disabled.
 * @property {string} label - The label for the password text box.
 * @property {boolean} [required] - Indicates whether the password is required.
 * @property {*} [type] - The type of the password text box.
 * @property {*} [value] - The value of the password text box.
 */

/**
 * 
 * @param {WorkSigninPasswordTextBoxProps} props 
 */
export const WorkSigninPasswordTextBox = (props) => {
  /* eslint-disable no-unused-vars */
  const { autoFocus, dataTestId = 'login_password', disabled, label, name, required, type, value } = props

  const [_value, setValue] = useState(value)

  const onValueChange = (val) => {
    setValue(val)
  }

  return (
    <CometFormTextInput
      autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD={autoFocus}
      data-testid={undefined}
      disabled={disabled}
      label={label}
      name={name}
      onValueChange={onValueChange}
      required={required}
      type={type}
      value={_value}
    />
  )
}
