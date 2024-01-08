/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { useMatches } from "@tanstack/react-router";

import { LoginWrapper } from "@/feature/login";

export const LoginPage = () => {
  const a = useMatches();

  console.log({ a });

  return <LoginWrapper />;
};
