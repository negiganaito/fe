/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import { createPortal } from "react-dom";
import stylex from "@stylexjs/stylex";
import executionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { BasePortalTargetContext } from "@/faang/context";
import { useStable } from "@/faang/hooks";
import { suspendOrThrowIfUsedInSSR } from "@/faang/lazy-load-component";

import { BaseDOMContainer } from "./base-dom-container";
import { BaseThemeProvider } from "./base-theme-provider";

export const BasePortal = (props) => {
  const { children, xstyle, hidden = false, target } = props;

  const basePortalTargetContext = useContext(BasePortalTargetContext);
  const domNode = target || basePortalTargetContext;
  const providerValue = useStable(() => {
    executionEnvironment.canUseDOM ? document.createElement("div") : null;
  });

  suspendOrThrowIfUsedInSSR(
    "BasePortal: Portals are not currently supported by the server renderer."
  );

  return domNode
    ? createPortal(
        <BaseThemeProvider>
          {(themeClasses, themeStyle) => (
            <div
              {...(hidden && { hidden: true })}
              className={stylex(themeClasses, xstyle)}
              style={themeStyle}
            >
              <BasePortalTargetContext.Provider value={providerValue}>
                {children}
              </BasePortalTargetContext.Provider>
              <BaseDOMContainer node={providerValue} />
            </div>
          )}
        </BaseThemeProvider>,
        domNode
      )
    : undefined;

  // return domNode
  //   ? createPortal(
  //       jsx(BaseThemeProvider, {
  //         children: (themeClasses, themeStyle) => {
  //           return jsx("div", {
  //             ...(hidden && { hidden }),
  //             children: [
  //               jsx(BasePortalTargetContext.Provider, {
  //                 children,
  //                 value: providerValue,
  //               }),
  //               jsx(BaseDOMContainer, {
  //                 node: providerValue,
  //               }),
  //             ],
  //             className: stylex(themeClasses.theme, xstyle),
  //             style: themeStyle,
  //           });
  //         },
  //       }),
  //       domNode
  //     )
  //   : undefined;
};
