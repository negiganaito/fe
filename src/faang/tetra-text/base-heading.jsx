/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import stylex from "@stylexjs/stylex";
import { forwardRef, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";

import { BaseHeadingContext } from "./base-heading-context";
import { useBaseTextContext } from "./base-text-context";

const styles = stylex.create({
  root: {
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    outline: "none",
  },
});

// TODO jsdoc
// eslint-disable-next-line no-unused-vars
const baseHeading = (
  { children, xstyle, isPrimaryHeading = false, testid, ...rest },
  ref
) => {
  const heading = useContext(BaseHeadingContext);

  const HeadingComponent = useMemo(
    () => (isPrimaryHeading ? "h1" : `h${Math.max(Math.min(heading, 6), 2)}`),
    [isPrimaryHeading, heading]
  );

  const baseTextContextValue = useBaseTextContext();
  const isNested =
    (!baseTextContextValue
      ? undefined
      : baseTextContextValue?.nested) === true;

  // HeadingComponent
  return jsx(HeadingComponent, {
    ...rest,
    children,
    className: stylex(styles.root, xstyle),
    "data-testid": undefined,
    dir: isNested ? undefined : "auto",
    ref,
  });
};

export const BaseHeading = forwardRef(baseHeading);
BaseHeading.displayName = "BaseHeading.react";
