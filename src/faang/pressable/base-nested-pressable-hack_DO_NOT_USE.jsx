/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useState, useEffect } from "react";

export function BaseNestedPressableHack_DO_NOT_USE(props) {
  const { children } = props;

  const [isMounted, setIsMounted] = useState();

  useEffect(() => {
    return setIsMounted(true);
  }, []);

  const placeholderStyle = isMounted
    ? null
    : {
        height: 0,
        width: 0,
      };

  return (
    <object {...placeholderStyle} type="nested/pressable">
      {children}
    </object>
  );

  // return jsx("object", {
  //   ...placeholderStyle,
  //   type: "nested/pressable",
  //   children,
  // });
}
