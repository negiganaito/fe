/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useMemo } from "react";
import { jsx } from "react/jsx-runtime";

import { CometIcon, fbicon } from "@/faang/icon";

import { ix } from "../utils";

import { CometMenuItemBase } from "./comet-menu-item-base";
import { CometMenuItemIcon } from "./comet-menu-item-icon";

export const CometFormComboboxMenuItem = (props) => {
  const { auxItemType, icon, iconType, isSelected, ...rest } = props;

  const aux = useMemo(() => {
    let Comp = null;

    if (isSelected) {
      Comp = jsx(CometIcon, {
        color: "highlight",
        icon: fbicon._(ix(477820), 20),
      });
    }

    if (auxItemType) {
      switch (auxItemType) {
        case "radio":
          Comp = isSelected
            ? jsx(CometIcon, {
                color: "highlight",
                icon: fbicon._(ix(621400), 24),
              })
            : jsx(CometIcon, {
                color: "primary",
                icon: fbicon._(ix(545519), 24),
              });
          break;
      }
    }

    return Comp;
  }, [auxItemType, isSelected]);

  console.log("CometFormComboboxMenuItem");

  return (
    <CometMenuItemBase
      {...rest}
      aria-selected={isSelected}
      aux={aux}
      iconNode={
        icon ? (
          <CometMenuItemIcon
            icon={icon}
            use={
              iconType === "profile-picture"
                ? "contained"
                : "contained_small_icon"
            }
          />
        ) : null
      }
      role="option"
    />
  );
};
