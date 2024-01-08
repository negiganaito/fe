/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* FB_PKG_DELIM */

import React, { forwardRef, useLayoutEffect, useMemo, useRef } from "react";
import stylex from "@stylexjs/stylex";

import { BaseFocusRing } from "@/faang/focus";
import { BaseInput } from "@/faang/form";
import { mergeRefs_Legacy, usePrevious } from "@/faang/hooks";

const styles = stylex.create({
  unresizable: {
    resize: "none",
  },
});

export const BaseTextArea = forwardRef((props, ref) => {
  const {
    maxRows = 200,
    minRows = 1,
    suppressFocusRing,
    unresizable = false,
    value,
    xstyle,
    ...rest
  } = props;

  const normalizeValue = value ? String(value) : value;

  const internalRef = useRef(null);

  const previousMaxRows = usePrevious(maxRows);
  const previousValue = usePrevious(normalizeValue);

  useLayoutEffect(() => {
    const val = internalRef?.current;

    if (val) {
      if (
        !previousMaxRows ||
        !previousValue ||
        !normalizeValue ||
        maxRows < previousMaxRows ||
        normalizeValue.length < previousValue.length
      ) {
        val.rows = Math.min(Math.max(minRows, 1), maxRows);
      }

      let { clientHeight } = val;

      while (val.rows < maxRows && clientHeight < val.scrollHeight) {
        val.rows += 1;

        const clientHeightChange = clientHeight;

        if (clientHeight === clientHeightChange) {
          break;
        }

        clientHeight = clientHeightChange;
      }

      val.style.overflow = val.rows < maxRows ? "hidden" : "auto";
    }
  }, [maxRows, minRows, previousMaxRows, previousValue]);

  const baseInputRef = useMemo(() => mergeRefs_Legacy(internalRef, ref), [ref]);

  return (
    <BaseFocusRing
      suppressFocusRing={suppressFocusRing}
      children={(param) => {
        return (
          <BaseInput
            {...rest}
            ref={baseInputRef}
            type="textarea"
            value={normalizeValue}
            xstyle={[param, unresizable && styles.unresizable, xstyle]}
          />
        );
      }}
    />
  );
});
