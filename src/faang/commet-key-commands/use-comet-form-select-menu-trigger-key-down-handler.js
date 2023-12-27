/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useRef } from "react";

const time = 500;

// eslint-disable-next-line max-params
export function useCometFormSelectMenuTriggerKeyDownHandler(
  setActiveValue,
  activeValue,
  filteredOptions,
  isMenuVisible,
  onShow
) {
  const g = useRef(null);
  const k = useRef("");
  const l = useRef("");
  const m = useRef(-1);

  return useCallback(
    (event) => {
      if (
        k.current === "" &&
        (event.code === "Backspace" ||
          event.code === "Clear" ||
          event.key === " ")
      ) {
        return;
      }

      if (
        !(
          event.key.length === 1 ||
          event.code === "Backspace" ||
          event.code === "Clear"
        ) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      event.code === "Backspace" || event.code === "Clear"
        ? (k.current = k.current.substring(0, k.current.length - 1))
        : (k.current += event.key.toLocaleLowerCase());

      event.preventDefault();

      g.current && clearTimeout(g.current);
      g.current = setTimeout(() => {
        k.current = "";
        g.current = null;
      }, time);

      event = filteredOptions.findIndex((a) => {
        return a.value === activeValue;
      });
      event = event === -1 ? 0 : event;

      for (let i = 0; i < filteredOptions.length; i++) {
        const n = (i + event) % filteredOptions.length;
        const o = filteredOptions[n];

        if (o.label.toString().toLocaleLowerCase().startsWith(k.current)) {
          if (!isMenuVisible) {
            onShow();
            setActiveValue(o.value);
            l.current = k.current.toLocaleLowerCase().substring(0, 1);
            m.current = n;
            return;
          }

          if (
            l.current === k.current.toLocaleLowerCase().substring(0, 1) &&
            m.current === n
          ) {
            continue;
          }

          l.current = k.current.toLocaleLowerCase().substring(0, 1);
          m.current = n;
          setActiveValue(o.value);
          return;
        }
      }
    },
    [activeValue, filteredOptions, isMenuVisible, onShow, setActiveValue]
  );
}
