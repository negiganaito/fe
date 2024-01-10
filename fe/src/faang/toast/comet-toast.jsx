/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { fbicon } from "../icon";
import { CometPressable } from "../pressable";
import { CometCircleButton } from "../tetra-button";
import { TetraText } from "../tetra-text";
import { ix } from "../utils";

import { BaseToast } from "./base-toast";

const styles = stylex.create({
  pressable: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});

export function CometToast({
  action,
  href,
  icon,
  impressionLoggingRef,
  message,
  onDismiss,
  supressCloseButton = false,
  target,
  testid = "Toast",
  truncateText = false,
  ...rest
}) {
  const linkProps = useMemo(() => {
    return href
      ? {
          target: target,
          url: href,
        }
      : void 0;
  }, [href, target]);
  return jsx(BaseToast, {
    action: action
      ? {
          label: action.label,
          labelRenderer: (child) => {
            return jsx(TetraText, {
              color: "blueLink",
              numberOfLines: 1,
              type: "body3",
              children: child,
            });
          },
          onPress: action.onPress,
          testid: action.testid,
        }
      : void 0,
    addOnStart: icon,
    closeButton:
      !supressCloseButton &&
      jsx(CometCircleButton, {
        icon: fbicon._(ix("478231"), 12),
        label: fbt.c("Close"),
        onPress: onDismiss,
        size: 24,
      }),
    linkWrapper:
      rest.onPress || linkProps
        ? function (child) {
            return jsx(CometPressable, {
              ...rest,
              expanding: !0,
              linkProps: linkProps,
              xstyle: styles.pressable,
              children: child,
            });
          }
        : void 0,
    message: ({ toastMessageId }) => {
      return jsx(TetraText, {
        color: "primary",
        id: toastMessageId,
        numberOfLines: truncateText ? 4 : void 0,
        type: "body3",
        children: message,
      });
    },
    onDismiss: onDismiss,
    testid: void 0,
    toastRef: impressionLoggingRef,
  });
}
