/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useEffect } from "react";
import { useMatch } from "@tanstack/react-router";

import { WorkGalahadNavStore } from "@/galahad/provider/work-galahad-nav-store";

export function AppTabIdHandler({ children }) {
  const pathname = useMatch();

  const { dispatch } = WorkGalahadNavStore.useWorkGalahadNavStore();

  useEffect(() => {
    dispatch(
      WorkGalahadNavStore.selectAppTabID(pathname.pathname.split("/")[1])
    );
  }, [pathname]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
