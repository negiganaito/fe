/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useContext, useRef } from "react";
import stylex from "@stylexjs/stylex";

import {
  CometKeyCommandContext,
  CometKeyCommandSettingsContext,
  CometKeyCommandUtilsContext,
} from "@/faang/context";
import { recoverableViolation } from "@/faang/error";
import { useStable } from "@/faang/hooks";

const styles = stylex.create({
  wrapperFocusable: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ":focus": {
      outline: "none",
    },
  },
});

// p
function isFocusableElement(element) {
  if (element instanceof HTMLInputElement) {
    return (
      element.type !== "hidden" && element.type !== "file" && !element.disabled
    );
  }
  return element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
    ? !element.disabled
    : element instanceof HTMLElement && element.isContentEditable;
}

// q
function isListboxWithActiveAria(element) {
  return element instanceof HTMLElement &&
    element.getAttribute("role") === "listbox"
    ? !element.getAttribute("aria-disabled")
    : false;
}

// r
function findCommandInGroup(commandMap, targetGroupID, targetCommandID) {
  // Iterate over the entries in the commandMap
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var entries = commandMap,
      isArray = Array.isArray(entries),
      index = 0,
      entries = isArray
        ? entries
        : entries[
            typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
          ]();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations, no-var
    var entry;

    if (isArray) {
      if (index >= entries.length) break;
      entry = entries[index++];
    } else {
      index = entries.next();
      if (index.done) break;
      entry = index.value;
    }

    // eslint-disable-next-line no-self-assign
    entry = entry; // Destructure the entry into key (h) and value (g)

    let key = entry[0];
    let value = entry[1]; // Check if the current entry matches the target groupID and commandID

    if (
      value.groupID === targetGroupID &&
      value.commandID === targetCommandID
    ) {
      // Return the corresponding value from the map
      return commandMap.get(key);
    }
  }
}

function s(a, b) {
  const c = false;
  // eslint-disable-next-line no-return-assign
  return (
    c && //    c("gkx")("3598") &&
    b.triggerFromInputs === true &&
    isFocusableElement(a) &&
    (!(a = b.command) ? void 0 : a.alt) === true
  );
}
let t = function (a, b) {
  recoverableViolation(
    "Tried to call showSingleCharacterKeyCommandWrapperDialogRef, but it was never set",
    "comet_ax"
  );
};
let u = function (a, b) {
  recoverableViolation(
    "Tried to call showModifiedKeyCommandWrapperDialogRef, but it was never set",
    "comet_ax"
  );
};

export const createKeyCommandWrapper = (a, b) => {
  return function d() {
    const cometKeyCommandContextValue = useContext(CometKeyCommandContext);
    const cometKeyCommandUtilsContextValue = useContext(
      CometKeyCommandUtilsContext
    );
    const cometKeyCommandSettingsContextValue = useContext(
      CometKeyCommandSettingsContext
    );

    const setActiveWrapper =
      cometKeyCommandUtilsContextValue &&
      cometKeyCommandUtilsContextValue.setActiveWrapper;

    const commandMap = useStable(() => {
      return new Map();
    });

    const u = useRef(t);
    const v = useRef(u);

    const x = useCallback(
      /**
       *
       * @param {string} keyName  "enter" "ctrl" "a" "b" "c" ...
       * @returns
       */
      (keyName) => {
        let keyMapValue = commandMap.get(keyName);
        if (
          (!keyMapValue ? undefined : keyMapValue.groupID) &&
          (!keyMapValue ? undefined : keyMapValue.commandID)
        ) {
          const customKeyCombination =
            cometKeyCommandSettingsContextValue.getCustomKeyCombination(
              keyMapValue.groupID,
              keyMapValue.commandID
            );
          if (
            !customKeyCombination ||
            areKeyCombinationsEqual(
              customKeyCombination,
              !keyMapValue ? undefined : keyMapValue.command
            )
          ) {
            return keyMapValue;
          } else {
            keyMapValue = null;
          }
        }
        const customKeyCommandValue = cometKeyCommandSettingsContextValue
          .getCustomCommandsMap()
          .get(keyName);
        if (
          customKeyCommandValue &&
          customKeyCommandValue.groupID &&
          customKeyCommandValue.commandID
        ) {
          const commandInGroupValue = findCommandInGroup(
            commandMap,
            customKeyCommandValue.groupID,
            customKeyCommandValue.commandID
          );
          commandInGroupValue && (keyMapValue = commandInGroupValue);
        }
        return keyMapValue;
      },
      [CometKeyCommandSettingsContext, commandMap]
    );

    const activeWrapper = useMemo(() => {
      return {
        /**
         * 
         * 
         * 
commandArr=[{
  "command": {
    "key": "l"
  },
  "commandID": "likeStory",
  "description": "Like or unlike a post",
  "groupID": "newsfeed",
  "singleCharDescription": "like or unlike a post",
  "isHiddenCommand": underfined,
  "triggerFromInputs": undefined
}]
         * 
         * @param {*} commandArr 
         * @param {*} b 
         * @returns 
         */
        addCommands: (commandArr, b) => {
          commandArr.forEach((commandItem) => {
            // var command = commandItem.command;

            let { command } = commandItem;

            if (command) {
              // return "l"
              command = createKeyCommand(command);
              var e = commandMap.has(command),
                g = e && b === !0;
              g = g || !e || b === void 0;
              g &&
                (commandMap.set(command, commandItem),
                cometKeyCommandUtilsContextValue &&
                  cometKeyCommandUtilsContextValue.notifyCommandUpdate());
            }
          });
          return () => {
            commandArr.forEach((commandItem) => {
              var command = commandItem.command;
              command = createKeyCommand(command);
              var d = commandMap.get(command);
              d === commandItem && commandMap["delete"](command);
            }),
              cometKeyCommandUtilsContextValue &&
                cometKeyCommandUtilsContextValue.notifyCommandUpdate();
          };
        },

        applyCommand: function (key: string, event: KeyboardEvent) {
          var e,
            f = x(key);
          if (f == null) {
            return !1;
          }
          var singleCharRegex = /^[a-z0-9]$/;
          // if (
          //   c('gkx')('3598') && // false
          //   ((e = f.command) == null ? void 0 : e.alt) === !0 &&
          //   cometKeyCommandSettingsContextValue.getModifiedKeyboardShortcutsPreference() ===
          //     1
          // ) {
          //   return !0
          // }
          if (
            (!f.triggerFromInputs && n(event.target)) ||
            (o(event.target) && singleCharRegex.test(key))
          ) {
            return !1;
          }
          if (
            event.type === "keyup" &&
            f.triggerOnKeyUp !== !0 &&
            f.triggerOnKeyUpAndKeyDown !== !0
          ) {
            return !1;
          }
          if (event.type === "keydown" && f.triggerOnKeyUp === !0) {
            return !1;
          }
          e = f.handler;
          if (f.shouldPreventDefault !== !1) {
            if (
              q(event.target, f) &&
              cometKeyCommandSettingsContextValue.getModifiedKeyboardShortcutsPreference() ===
                3
            ) {
              return !0;
            }
            e && event.preventDefault();
          }
          if (f.triggerOnRepeats === !1 && event.repeat === !0) {
            return !1;
          }
          if (e != null) {
            if (
              f.command != null &&
              q(event.target, f) &&
              cometKeyCommandSettingsContextValue.getModifiedKeyboardShortcutsPreference() ===
                4
            ) {
              v.current(f.command, f.singleCharDescription);
              return !0;
            }
            const areSingleKeysDisabled =
              cometKeyCommandSettingsContextValue &&
              cometKeyCommandSettingsContextValue.getAreSingleKeysDisabled();
            const _isSingleCharKey = isSingleCharKey(key);
            if (areSingleKeysDisabled === !0 && _isSingleCharKey) {
              return !0;
            }
            if (areSingleKeysDisabled === null && _isSingleCharKey) {
              u.current(key, f.singleCharDescription);
              return !0;
            }
            e();
            // const { description } = f
            // c('CometKeyCommandsTypedLoggerLite').log({
            //   key_combo: key,
            //   key_context: props.debugName,
            //   key_description: description,
            // })
            return f.shouldStopPropagation !== !1;
          }
          return !1;
        },

        debugName: props.debugName,

        getCommandMap: function () {
          return commandMap;
        },

        getParent: function () {
          return cometKeyCommandContextValue;
        },

        removeCommand: (a: any) => {
          commandMap["delete"](a),
            cometKeyCommandUtilsContextValue &&
              cometKeyCommandUtilsContextValue.notifyCommandUpdate();
        },

        setShowModifiedKeyCommandWrapperDialogRef: (a: any) => {
          v.current = a;
          return function () {
            v.current = s;
          };
        },

        setShowSingleCharacterKeyCommandWrapperDialogRef: function (a: any) {
          u.current = a;
          return function () {
            u.current = r;
          };
        },
      };
    }, [
      CometKeyCommandSettingsContext,
      CometKeyCommandUtilsContext,
      commandMap,
      CometKeyCommandContext,
      props.debugName,
      v,
      u,
      x,
    ]);
  };
};
