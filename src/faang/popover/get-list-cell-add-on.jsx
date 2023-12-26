/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { createElement } from "react";
import { jsx } from "react/jsx-runtime";
import fbt from "fbt";

// import { CometSwitch } from "@negiganai to/switch";
import { CometIcon, fbicon } from "@/faang/icon";
import { TetraButton } from "@/faang/tetra-button";

import { ix } from "../utils";

function getEndAddOn(addOn, disabled, level) {
  switch (addOn.type) {
    case "checkbox":
      return checkboxComp(addOn, disabled);
    case "radio":
      return radioComp(addOn, disabled);
    case "disclosure":
      return disclosureComp(addOn, disabled, level);
    case "expander":
      return expanderComp(addOn, disabled, level);
    case "icon":
      return iconComp(addOn, disabled);
    case "primary-button":
      return buttonComp(addOn, disabled);
    case "secondary-button":
      return buttonComp(addOn, disabled);
    case "switch":
      return switchComp(addOn, disabled);
    case "more":
      return moreOrCloseComp(addOn, disabled);
    case "close":
      return moreOrCloseComp(addOn, disabled);
    case "body":
      return addOn.addOn;
  }
}

const isRTL = false;

const checkboxComp = function (props, disabled) {
  const { on, onPress, testOnly_pressed, ...rest } = props;

  return jsx(CometIcon, {
    ...rest,
    "aria-checked": onPress ? on : undefined,
    color: disabled ? "disabled" : on ? "highlight" : "secondary",
    disabled,
    hideHoverOverlay: true,
    icon: on ? fbicon._(ix(484757), 20) : fbicon._(ix(659288), 20),
    onPress,
    role: onPress ? "checkbox" : undefined,
    testOnly_pressed,
  });
};

const radioComp = function (props, disabled) {
  const { on, onPress, testOnly_pressed, ...rest } = props;

  return jsx(CometIcon, {
    ...rest,
    "aria-checked": onPress ? on : undefined,
    color: disabled ? "disabled" : on ? "highlight" : "secondary",
    disabled,
    hideHoverOverlay: true,
    icon: on ? fbicon._(ix(621399), 20) : fbicon._(ix(545517)),
    onPress,
    role: onPress ? "radio" : undefined,
    testOnly_pressed,
  });
};

const disclosureComp = function (props, disabled, iconNumber) {
  // eslint-disable-next-line no-unused-vars
  const { text, type, ...rest } = props;

  let icon;

  iconNumber === 3
    ? (icon = isRTL ? fbicon._(ix(492521), 24) : fbicon._(ix(492575), 24))
    : (icon = isRTL ? fbicon._(ix(492518), 20) : fbicon._(ix(492572), 20));

  return jsx(CometIcon, {
    ...rest,
    color: disabled ? "disabled" : "secondary",
    disabled,
    icon,
  });
};

const expanderComp = function (props, disabled, e) {
  // eslint-disable-next-line no-unused-vars
  const { children, onPress, open, type, ...rest } = props;

  return jsx(CometIcon, {
    ...rest,
    color: disabled ? "disabled" : "secondary",
    disabled,
    icon: open ? fbicon._(ix(505565), 20) : fbicon._(ix(492454), 20),
    onPress,
  });
};

const iconComp = function (props, disabled) {
  const {
    color,
    icon,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    testOnly_pressed,
    // eslint-disable-next-line no-unused-vars
    type,
    ...rest
  } = props;

  const _color = color ?? "primary";
  return jsx(CometIcon, {
    ...rest,
    color: disabled ? "disabled" : _color,
    disabled,
    hideHoverOverlay: true,
    icon,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    testOnly_pressed,
  });
};

const buttonComp = function (props, disabled) {
  const { labelIsHidden = false, type, ...rest } = props;

  const _type = type === "primary-button" ? "primary" : "secondary";

  return createElement(
    TetraButton,
    labelIsHidden
      ? {
          disabled,
          labelIsHidden: true,
          type: _type,
          ...rest,
        }
      : {
          disabled,
          type: _type,
          ...rest,
        }
  );
};

const switchComp = function (props, disabled) {
  // eslint-disable-next-line no-unused-vars
  const { onChange, size, type, value, ...rest } = props;

  return jsx("CometSwitch", {
    disabled,
    onClick: onChange ?? function () {},
    size,
    tabIndex: -1,
    value,
    ...rest,
    children: rest.disabled ? fbt.c("Disabled") : fbt.c("Enabled"),
  });
};

const moreOrCloseComp = function (a, disabled) {
  const { onPress, type, ...rest } = a;

  return jsx(CometIcon, {
    ...rest,
    color: disabled ? "disabled" : "secondary",
    disabled,
    icon: type === "more" ? fbicon._(ix(484391), 24) : fbicon._(ix(478237), 16),
    onPress,
  });
};

export const getListCellAddOn = {
  getEndAddOn,
};
