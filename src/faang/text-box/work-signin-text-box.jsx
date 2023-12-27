/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useState } from "react";
import stylex from "@stylexjs/stylex";

import { CometFormTextInput } from "@/faang/form";

const styles = stylex.create({
  disabledInput: {
    color: "var(--primary-text)!important",
  },
});

export const WorkSigninTextBox = (props) => {
  const {
    autoFocus,
    // eslint-disable-next-line no-unused-vars
    dataTestId,
    disabled,
    label,
    name,
    required,
    // eslint-disable-next-line no-unused-vars
    type,
    value,
  } = props;

  const [dynamicValue, onValueChange] = useState(value);

  return (
    <div key={label}>
      <CometFormTextInput
        autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD={autoFocus}
        data-testid={undefined}
        disabled={disabled}
        label={label}
        name={name}
        onValueChange={onValueChange}
        required={required}
        testid={undefined}
        type="text"
        value={dynamicValue}
        xstyle={styles.disabledInput}
      />
      <input name={name} type="hidden" value={dynamicValue} />
    </div>
  );
};
