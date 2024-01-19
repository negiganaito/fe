/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from "react";

import { LegacyHidden } from "../common";

import { CometPlaceholder } from "./comet-placeholder";

// eslint-disable-next-line no-unused-vars
const d = forwardRef(({ children }, ref) => {
  return (
    <>
      {" "}
      {children(ref, () => {
        return null;
      })}{" "}
    </>
  );
});

// type PlaceholderProps = {
//   children?: any
//   className?: string
//   fallback?: any
//   hidden?: boolean
//   ignoreLateMutation?: any
//   name?: string
//   pageletAriaProps?: any
//   pageletLogNamePoisitionLimit?: any
//   position?: any
// }

const Placeholder = forwardRef(
  (
    {
      children,
      className,
      fallback,
      hidden,
      ignoreLateMutation,
      name,
      pageletAriaProps,
      pageletLogNamePoisitionLimit,
      position,
      ...rest
    },
    ref
  ) => {
    return (
      <CometPlaceholder fallback={fallback}>
        <LegacyHidden
          htmlAttributes={{
            className,
            ...pageletAriaProps,
          }}
          mode={hidden === !0 ? "hidden" : "visible"}
          ref={ref}
        >
          {children}
        </LegacyHidden>
      </CometPlaceholder>
    );
  }
);

export const CometPagelet = {
  Placeholder,
};
