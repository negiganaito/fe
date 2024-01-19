/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { createContext, useContext, useMemo } from "react";
import { useMatch } from "@tanstack/react-router";

import {
  defaultRoute,
  uiConfiguration,
} from "@/galahad/config/ui-configuration";

const useMatchesHandler = () => {
  const match = useMatch();

  // todo: potential bug here
  const view = useMemo(() => {
    // eslint-disable-next-line no-unused-vars
    const [empty, tabkey, channelGeminiKey, ...rest] =
      match.pathname.split("/");

    if (!channelGeminiKey) {
      // @ts-ignore
      return defaultRoute[tabkey];
    }

    return channelGeminiKey;
  }, [match]);

  return {
    view,
    path: match,
  };
};

const findDeepMenuEntry = (view, mainMenu, path) => {
  if (view) {
    return mainMenu?.find((menu) => {
      switch (menu.type) {
        case "menu":
          return menu.children
            ? findDeepMenuEntry(view, menu.children)
            : menu.key === view || menu.extraKeys?.includes(view);
        default:
          return undefined;
      }
    });
  } else {
    return undefined;
  }
};

function usePipedriveMenuHandler(uiConfig) {
  const { mainMenu } = uiConfig;
  const { path, view } = useMatchesHandler();

  const main = useMemo(
    () => findDeepMenuEntry(view, mainMenu, path),
    [mainMenu, view, path]
  );

  return view
    ? {
        main,
        path,
        view,
      }
    : { main: undefined, path: undefined, view: undefined };
}

// type PipedriveRouteContextProps = {
//   subMenu?: SubMenu
//   view?: string
//   path?: string
// }

const Context = createContext(undefined);

export const PipedriveRouteContext = ({ children }) => {
  const matches = usePipedriveMenuHandler(uiConfiguration);

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ subMenu: matches.main, path: matches.path, view: matches.view }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePipedriveRoute = () => {
  const context = useContext(Context);

  if (context === undefined) {
    // eslint-disable-next-line no-throw-literal
    throw "";
  }

  return context;
};
