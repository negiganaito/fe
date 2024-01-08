/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useMemo } from "react";

import { CometKeys } from "@/faang/commet-key-commands";

export function useCometFormSelectOnlyComboboxKeyConfigs({
  activeValue,
  filteredOptions,
  isMenuVisible,
  onHide,
  onPress,
  onShow,
  setActiveValue,
  value,
}) {
  const handlerKey1 = useCallback(() => {
    if (filteredOptions.length === 0) return;
    if (!isMenuVisible) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var a;
      setActiveValue((a = value) !== null ? a : filteredOptions[0].value);
      onShow();
      return;
    }
    a = filteredOptions.findIndex((a) => {
      return a.value === activeValue;
    });
    a > 0 && setActiveValue(filteredOptions[a - 1].value);
    onShow();
  }, [
    filteredOptions,
    isMenuVisible,
    onShow,
    setActiveValue,
    value,
    activeValue,
  ]);
  const handlerKey2 = useCallback(() => {
    if (filteredOptions.length === 0) return;
    if (!isMenuVisible) {
      // eslint-disable-next-line no-inner-declarations, no-var
      var a;
      onShow();
      setActiveValue((a = value) !== null ? a : filteredOptions[0].value);
      return;
    }
    a = filteredOptions.findIndex((a) => {
      return a.value === activeValue;
    });
    a < filteredOptions.length - 1 &&
      setActiveValue(filteredOptions[a + 1].value);
    onShow();
  }, [
    filteredOptions,
    isMenuVisible,
    onShow,
    setActiveValue,
    value,
    activeValue,
  ]);

  return useMemo(() => {
    return [
      {
        command: {
          key: CometKeys.ENTER,
        },
        description: "Select option",
        handler: onPress,
      },
      {
        command: {
          key: CometKeys.SPACE,
        },
        description: "Select option",
        handler: onPress,
      },
      {
        command: {
          alt: !0,
          key: CometKeys.UP,
        },
        description: "Select option",
        handler: onPress,
      },
      {
        command: {
          key: CometKeys.ESCAPE,
        },
        description: "Close listbox",
        handler: function () {
          isMenuVisible && onHide();
        },
        shouldStopPropagation: isMenuVisible ? void 0 : !1,
      },
      {
        command: {
          key: CometKeys.TAB,
        },
        description: "Select option",
        handler: onPress,
        shouldPreventDefault: !1,
      },
      {
        command: {
          key: CometKeys.DOWN,
        },
        description: "Select Next item",
        handler: handlerKey2,
      },
      {
        command: {
          key: CometKeys.UP,
        },
        description: "Select Previous item",
        handler: handlerKey1,
      },
      {
        command: {
          key: CometKeys.HOME,
        },
        description: "Select First item",
        handler: function () {
          isMenuVisible || onShow();
          setActiveValue(filteredOptions[0].value);
        },
      },
      {
        command: {
          key: CometKeys.END,
        },
        description: "Select last item",
        handler: function () {
          isMenuVisible || onShow();
          setActiveValue(filteredOptions[filteredOptions.length - 1].value);
        },
      },
      {
        command: {
          key: CometKeys.PAGE_UP,
        },
        description: "Page up",
        handler: function () {
          let a = filteredOptions.findIndex((a) => {
            return a.value === activeValue;
          });
          isMenuVisible &&
            (filteredOptions.length <= 11 || a <= 11
              ? setActiveValue(filteredOptions[0].value)
              : setActiveValue(
                  filteredOptions[filteredOptions.length - 10].value
                ));
        },
      },
      {
        command: {
          key: CometKeys.PAGE_DOWN,
        },
        description: "Page down",
        handler: function () {
          let a = filteredOptions.findIndex((a) => {
            return a.value === activeValue;
          });
          isMenuVisible &&
            (filteredOptions.length <= 11 || filteredOptions.length - a <= 11
              ? setActiveValue(
                  filteredOptions[filteredOptions.length - 1].value
                )
              : setActiveValue(
                  filteredOptions[filteredOptions.length + 10].value
                ));
        },
      },
    ];
  }, [
    onPress,
    isMenuVisible,
    handlerKey2,
    handlerKey1,
    onHide,
    setActiveValue,
    filteredOptions,
    onShow,
    activeValue,
  ]);
}
