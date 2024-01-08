/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { BaseContextualLayer } from "../base-contextual-layer";
import {
  CometComponentWithKeyCommands,
  CometKeys,
} from "../commet-key-commands";
import { FocusWithinHandler } from "../focus";
import { FocusInertRegion, focusScopeQueries } from "../focus-region";

import { CometFormComboboxMenuItem, CometMenu } from ".";
/**

- CometSelectMenuTrigger
  - BaseContextualLayer
  - CometComponentWithKeyCommands
  - CometFormComboboxMenuItem
  - CometKeys
  - CometMenu
  - FocusInertRegion
  - FocusWithinHandler
  - focusScopeQueries
 */

const r = stylex.create({
  hideOutline: {
    outline: "none",
  },
});

const debounceTime = 1e3;

function generateId(prefix, index) {
  // return prefix + "__" + (index !== null ? index : "0");
  return `${prefix}__${index !== null ? index : "0"}`;
}

export const CometSelectMenuTrigger = (props) => {
  const {
    children,
    disabled = false,
    header,
    onChange,
    options,
    selectedValue,
    size = "normal",
    truncate = true,
    ...rest
  } = props;

  let [isMenuOpen, setMenuOpen] = useState(false);
  const isMenuVisible = isMenuOpen && options.length > 0;
  const triggerId = useId();
  const menuId = useId();
  const inputId = useId();
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);

  const openMenu = useCallback(() => {
    return setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setSelectedOption(null);
    setMenuOpen(false);
  }, []);

  const handleFocusChange = useCallback(
    (ev) => {
      ev || closeMenu();
    },
    [closeMenu]
  );

  const handleMenuChange = useCallback(() => {
    if (isMenuVisible) {
      selectedOption !== null && onChange(selectedOption);
      closeMenu();
    } else {
      // let a;
      // setSelectedOption((a = selectedValue) !== null ? a : null);
      // openMenu();

      let newSelectedOption = selectedValue !== null ? selectedValue : null;
      setSelectedOption(newSelectedOption);
      openMenu();
    }
  }, [
    selectedOption,
    isMenuVisible,
    onChange,
    closeMenu,
    openMenu,
    selectedValue,
  ]);

  const activeOptions = options.filter((option) => !option.disabled);

  const keyCommands = useMemo(() => {
    return [
      {
        command: {
          key: CometKeys.ENTER,
        },
        description: fbt.c("Select item"),
        handler: () => {},
        triggerOnKeyUp: true,
      },
    ].concat(
      isMenuVisible
        ? [
            {
              command: {
                key: CometKeys.ESCAPE,
              },
              description: fbt.c("Close suggestions"),
              handler: () => {
                isMenuVisible && closeMenu();
              },
            },
          ]
        : [],
      [
        {
          command: {
            key: CometKeys.DOWN,
          },
          description: fbt.c("Next item"),
          handler: () => {
            if (activeOptions.length > 0) {
              let index = activeOptions.findIndex(
                (option) => option.value === selectedOption
              );
              // if (selectedOption === null || index === -1) {
              //   // let b;
              //   // setSelectedOption(
              //   //   (b = selectedValue) !== null ? b : activeOptions[0].value
              //   // );
              //   let newSelectedValue =
              //     selectedValue !== null
              //       ? selectedValue
              //       : activeOptions[0].value;
              //   setSelectedOption(newSelectedValue);
              // } else
              //   index === activeOptions.length - 1
              //     ? setSelectedOption(activeOptions[0].value)
              //     : setSelectedOption(activeOptions[index + 1].value);
              // openMenu();

              if (selectedOption === null || index === -1) {
                let newSelectedValue =
                  selectedValue !== null
                    ? selectedValue
                    : activeOptions[0].value;
                setSelectedOption(newSelectedValue);
              } else if (index === activeOptions.length - 1) {
                setSelectedOption(activeOptions[0].value);
              } else {
                setSelectedOption(activeOptions[index + 1].value);
              }
              openMenu();
            }
          },
        },
        {
          command: {
            key: CometKeys.UP,
          },
          description: fbt.c("Previous item"),
          handler: () => {
            if (activeOptions.length > 0) {
              // let a = activeOptions.findIndex((a) => {
              //   return a.value === selectedOption;
              // });

              // if (selectedOption === null || a === -1) {
              //   let b;
              //   setSelectedOption(
              //     (b = selectedValue) !== null
              //       ? b
              //       : activeOptions[activeOptions.length - 1].value
              //   );
              // } else
              //   a === 0
              //     ? setSelectedOption(
              //         activeOptions[activeOptions.length - 1].value
              //       )
              //     : setSelectedOption(activeOptions[a - 1].value);
              // openMenu();

              let index = activeOptions.findIndex(
                (option) => option.value === selectedOption
              );

              if (selectedOption === null || index === -1) {
                let newSelectedValue =
                  selectedValue !== null
                    ? selectedValue
                    : activeOptions[activeOptions.length - 1].value;
                setSelectedOption(newSelectedValue);
              } else if (index === 0) {
                setSelectedOption(
                  activeOptions[activeOptions.length - 1].value
                );
              } else {
                setSelectedOption(activeOptions[index - 1].value);
              }
              openMenu();
            }
          },
        },
        {
          command: {
            alt: true,
            key: CometKeys.DOWN,
          },
          description: fbt.c("Show suggestions"),
          handler: openMenu,
        },
        {
          command: {
            alt: true,
            key: CometKeys.UP,
          },
          description: fbt.c("Close suggestions"),
          handler: closeMenu,
        },
        {
          command: {
            key: CometKeys.HOME,
          },
          description: fbt.c("First item"),
          handler: () => {
            isMenuVisible && setSelectedOption(activeOptions[0].value);
          },
        },
        {
          command: {
            key: CometKeys.END,
          },
          description: fbt.c("Last item"),
          handler: () => {
            isMenuVisible &&
              setSelectedOption(activeOptions[activeOptions.length - 1].value);
          },
        },
      ]
    );
  }, [
    openMenu,
    selectedOption,
    closeMenu,
    selectedValue,
    isMenuVisible,
    activeOptions,
  ]);

  const debounceTimeoutRef = useRef(null);

  const debouncedInput = useRef("");

  const handleInput = useCallback(
    (event) => {
      if (
        debouncedInput.current === "" &&
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

      if (event.code === "Backspace" || event.code === "Clear") {
        debouncedInput.current = debouncedInput.current.substring(
          0,
          debouncedInput.current.length - 1
        );
      } else {
        debouncedInput.current += event.key.toLocaleLowerCase();
      }

      event.preventDefault();
      debounceTimeoutRef.current !== null &&
        clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        debouncedInput.current = "";
        debounceTimeoutRef.current = null;
      }, debounceTime);
      let index = activeOptions.findIndex((option) => {
        return option.value === selectedOption;
      });
      index = index === -1 ? 0 : index;
      for (let i = 0; i < activeOptions.length; i++) {
        let newIndex = (i + index) % activeOptions.length;
        const option = activeOptions[newIndex];
        if (
          option.label
            .toString()
            .toLocaleLowerCase()
            .startsWith(debouncedInput.current)
        ) {
          isMenuVisible || openMenu(); //  !isMenuVisible && openMenu();
          setSelectedOption(option.value);
          return;
        }
      }
    },
    [selectedOption, activeOptions, isMenuVisible, openMenu]
  );

  useEffect(() => {
    let element = inputRef.current;
    if (element !== null) {
      element.addEventListener("keydown", handleInput);
      return function () {
        element.removeEventListener("keydown", handleInput);
      };
    }
  }, [handleInput]);

  const selectedOptionIndex = options.findIndex((option) => {
    return option.value === selectedOption;
  });

  return (
    <FocusWithinHandler onFocusChange={handleFocusChange}>
      <CometComponentWithKeyCommands commandConfigs={keyCommands}>
        {children(
          inputRef,
          {
            "aria-activedescendant":
              isMenuVisible &&
              selectedOption !== null &&
              selectedOptionIndex !== -1
                ? generateId(triggerId, selectedOptionIndex)
                : void 0,
            "aria-controls": isMenuVisible ? menuId : void 0,
            "aria-expanded": isMenuVisible,
            disabled: disabled,
            id: inputId,
            onPress: handleMenuChange,
            role: "combobox",
            xstyle: [selectedOption !== null && r.hideOutline],
          },
          isMenuVisible
        )}
        {isMenuVisible && (
          <BaseContextualLayer {...rest} contextRef={inputRef}>
            <FocusInertRegion focusQuery={focusScopeQueries.tabbableScopeQuery}>
              <CometMenu
                header={header}
                id={menuId}
                role="listbox"
                size={size}
                truncate={truncate}
              >
                {options.map((option, index) => {
                  return (
                    <CometFormComboboxMenuItem
                      aria-disabled={option.disabled}
                      aria-posinset={index}
                      aria-selected={option.value === selectedValue}
                      aria-setsize={options.length}
                      bodyColor={option.bodyColor}
                      bodyText={option.bodyText}
                      disabled={option.disabled}
                      icon={option.icon}
                      id={generateId(triggerId, index)}
                      isSelected={option.value === selectedValue}
                      onClick={() => {
                        onChange(option.value);
                        closeMenu();
                      }}
                      preventClosingMenuOnSelect
                      primaryText={option.label}
                      role="option"
                      secondaryColor={option.secondaryColor}
                      secondaryText={option.secondaryText}
                      testid={undefined}
                      visuallyFocused={option.value === selectedOption}
                      key={option.value}
                    />
                  );
                })}
              </CometMenu>
            </FocusInertRegion>
          </BaseContextualLayer>
        )}
      </CometComponentWithKeyCommands>
    </FocusWithinHandler>
  );
};
