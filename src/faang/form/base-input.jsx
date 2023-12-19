/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from "@stylexjs/stylex";
import Locale from "fbjs/lib/Locale";
import { forwardRef, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";

import { CometContainerPressableContext } from "@/faang/pressable/comet-container-pressable-context";
import { testID } from "@/faang/utils/test-id";

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":disabled": {
      cursor: "not-allowed",
    },
    WebkitTapHighlightColor: "transparent",
    boxSizing: "border-box",
    touchAction: "manipulation",
  },
  zIndex: {
    zIndex: 1,
  },
});

const isRTL = Locale.isRTL();

export const BaseInput = forwardRef((props, ref) => {
  const {
    onChange,
    onClick,
    onValueChange,
    type = "text",
    xstyle,
    testid,
    ...rest
  } = props;

  const compBaseOnType = useMemo(() => {
    switch (type) {
      case "switch":
        return "checkbox";
      default:
        return type;
    }
  }, [type]);

  const isCheckboxOrRadio =
    compBaseOnType === "checkbox" || compBaseOnType === "radio";
  const isTextarea = compBaseOnType === "textarea";
  const cometContainerPressableContextValue = useContext(
    CometContainerPressableContext
  );

  const commonProps = {
    dir: isRTL ? "rtl" : "ltr",
    ...rest,
    ...testID(testid),
    // WARN
    ...stylex.props(
      styles.root,
      xstyle,
      cometContainerPressableContextValue && styles.zIndex
    ),
    onChange: (event) => {
      if (!isCheckboxOrRadio) {
        if (onValueChange) {
          onValueChange(event.target.value, event);
        }
        if (onChange) {
          onChange(event);
        }
      }
    },
    onClick: (event) => {
      if (isCheckboxOrRadio && onValueChange) {
        onValueChange(event.target.checked, event);
      }
      if (onClick) {
        onClick(event);
      }
    },
  };

  // NOTE Use React with JSX-html tag in the future
  return isTextarea
    ? jsx("textarea", {
        suppressHydrationWarning: true,
        ...commonProps,
        ref,
      })
    : jsx("input", {
        suppressHydrationWarning: true,
        ...commonProps,
        ref,
        type: compBaseOnType,
      });
});

BaseInput.displayName = "BaseInput.react";
