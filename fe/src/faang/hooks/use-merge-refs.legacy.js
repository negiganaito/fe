/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo } from "react";

export function assignRef(ref, value) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  try {
    if (typeof ref === "object") {
      ref.current = value;
      return;
    }
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

export function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      assignRef(ref, node);
    });
  };
}

/**
 * useMergeRefs is a custom hook used to merge several react refs into a single one.
 * @param refs multiple refs.
 * @returns  a function that receives the element and assign the value to the given React refs.
 */
export function useMergeRefs(...refs) {
  return useMemo(() => mergeRefs(...refs), refs);
}
