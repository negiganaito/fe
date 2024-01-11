/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useId, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import { BaseView } from "../base-row";
import { FocusRegion, focusScopeQueries } from "../focus-region";
import { useCurrentDisplayMode } from "../hooks";
import { BaseInlinePressable } from "../pressable";

import { BaseTheme } from "./base-theme";

const config = {
  dark: "__fb-dark-mode ",
  light: "__fb-light-mode ",
  type: "CLASSNAMES",
};
const styles = stylex.create({
  item: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "var(--toast-addon-padding-vertical)",
    paddingRight: "var(--toast-addon-padding-horizontal)",
    paddingLeft: "var(--toast-addon-padding-horizontal)",
    paddingTop: "var(--toast-addon-padding-vertical)",
  },
  itemText: {
    flexGrow: 1,
  },
  link: {
    wordBreak: "keep-all",
  },
  root: {
    alignItems: "center",
    backgroundColor: "var(--toast-background)",
    borderTopLeftRadius: "var(--toast-corner-radius)",
    borderTopRightRadius: "var(--toast-corner-radius)",
    borderBottomRightRadius: "var(--toast-corner-radius)",
    borderBottomLeftRadius: "var(--toast-corner-radius)",
    boxShadow: "var(--shadow-elevated)",
    display: "flex",
    flexShrink: 0,
    maxWidth: "var(--toast-container-max-width)",
    minWidth: "var(--toast-container-min-width)",
    paddingLeft: "var(--toast-container-padding-horizontal)",
    paddingRight: "var(--toast-container-padding-horizontal)",
    paddingTop: "var(--toast-container-padding-vertical)",
    paddingBottom: "var(--toast-container-padding-vertical)",
  },
  rootFullWidth: {
    width: "100%",
  },
});

export function BaseToast({
  action,
  addOnStart,
  closeButton,
  linkWrapper,
  message,
  onDismiss,
  size = "full-width",
  testid,
  toastRef,
  useInvertedDisplayMode = true,
}) {
  const displayMode = useCurrentDisplayMode() === "dark" ? "light" : "dark";

  const toastMessageId = useId();
  const ariaProps = useMemo(() => {
    if (action) return {};
    else
      return {
        "aria-atomic": true,
        role: "alert",
      };
  }, [action]);

  const Wrapper = (
    <>
      {addOnStart && <BaseView xstyle={styles.item}>{addOnStart}</BaseView>}
      <BaseView xstyle={[styles.item, styles.itemText]} {...ariaProps}>
        {message({
          toastMessageId: toastMessageId,
        })}
      </BaseView>

      {action && (
        <FocusRegion.FocusRegion
          autoFocusQuery={focusScopeQueries.tabbableScopeQuery}
        >
          <BaseView
            aria-labelledby={toastMessageId}
            role="group"
            xstyle={styles.item}
          >
            {action.element
              ? action.element
              : action.labelRenderer && (
                  <BaseInlinePressable
                    onPress={(e) => {
                      onDismiss();
                      action.onPress(e);
                    }}
                    testid={undefined}
                    xstyle={styles.link}
                  >
                    {action.labelRenderer(action.label)}
                  </BaseInlinePressable>
                )}
          </BaseView>
        </FocusRegion.FocusRegion>
      )}

      {closeButton && <BaseView xstyle={styles.item}>{closeButton}</BaseView>}
    </>
  );

  const linkWrapperComp = linkWrapper ? linkWrapper(Wrapper) : Wrapper;
  return useInvertedDisplayMode ? (
    <BaseTheme
      config={config}
      displayMode={displayMode}
      ref={toastRef}
      testid={undefined}
      xstyle={[styles.root, size === "full-width" && styles.rootFullWidth]}
    >
      {linkWrapperComp}
    </BaseTheme>
  ) : (
    <BaseView
      ref={toastRef}
      testid={undefined}
      xstyle={[styles.root, size === "full-width" && styles.rootFullWidth]}
    >
      {linkWrapperComp}
    </BaseView>
  );
}

// const Wrapper = jsxs(React.Fragment, {
//   children: [
//     addOnStart &&
//       jsx(BaseView, {
//         xstyle: styles.item,
//         children: addOnStart,
//       }),
//     jsx(BaseView, {
//       xstyle: [styles.item, styles.itemText],
//       ...ariaProps,
//       children: message({
//         toastMessageId: toastMessageId,
//       }),
//     }),
//     action &&
//       jsx(FocusRegion.FocusRegion, {
//         autoFocusQuery: focusScopeQueries.tabbableScopeQuery,
//         children: jsx(BaseView, {
//           "aria-labelledby": toastMessageId,
//           role: "group",
//           xstyle: styles.item,
//           children: action.element
//             ? action.element
//             : action.labelRenderer &&
//               jsx(BaseInlinePressable, {
//                 onPress: function (a) {
//                   onDismiss();
//                   action.onPress(a);
//                 },
//                 testid: void 0,
//                 xstyle: styles.link,
//                 children: action.labelRenderer(action.label),
//               }),
//         }),
//       }),
//     closeButton &&
//       jsx(BaseView, {
//         xstyle: styles.item,
//         children: closeButton,
//       }),
//   ],
// });
