/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/*

__d("BaseCheckbox.react", 
  - ["BaseFocusRing.react", 
  - "BaseInput.react", 
  - "BaseView.react", 
  - "mergeRefs", "react"]

*/

import React, {
  forwardRef,
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import stylex from "@stylexjs/stylex";

import { BaseView } from "../base-row";
import { BaseFocusRing } from "../focus";
import { BaseInput } from "../form";
import { mergeRefs_Legacy } from "../hooks";

const styles = stylex.create({
  checkbox: {
    cursor: "pointer",
    height: "100%",
    margin: 0,
    opacity: ".001",
    outline: "none",
    padding: 0,
    position: "absolute",
    left: 0,
    right: null,
    top: 0,
    width: "100%",
  },
  wrapper: {
    position: "relative",
  },
});

export const BaseCheckbox = memo(
  forwardRef((props, ref) => {
    const {
      children,
      indeterminate = false,
      suppressFocusRing,
      // eslint-disable-next-line no-unused-vars
      testid,
      xstyle,
      ...rest
    } = props;

    const checkboxRef = useRef(null);

    useLayoutEffect(() => {
      checkboxRef.current &&
        (checkboxRef.current.indeterminate = indeterminate);
    }, [indeterminate]);

    let mergedRef = useMemo(() => {
      return mergeRefs_Legacy(ref, checkboxRef);
    }, [ref]);

    return (
      <BaseFocusRing
        suppressFocusRing={suppressFocusRing}
        children={(param) => {
          return (
            <BaseView
              testid={undefined}
              xstyle={[styles.wrapper, param, xstyle]}
            >
              {children}
              <BaseInput
                {...rest}
                aria-checked={indeterminate ? "mixed" : rest.checked ?? false}
                ref={mergedRef}
                type="checkbox"
                xstyle={styles.checkbox}
              />
            </BaseView>
          );
        }}
      />
    );
  })
);
