/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useState } from "react";
import { useFragment } from "react-relay";

import { CometCard } from "@/faang/card";

import { CometMemoriesContainer_viewer } from "../@graphql/CometMemoriesContainer_viewer.graphql";

import { CometMemoriesDatesSettingsInput } from "./comet-memories-dates-settings-input";

let container;

export const CometMemoriesDatesSettingsInputWrapper = () => {
  useFragment(
    container ? container : (container = CometMemoriesContainer_viewer)
  );

  const [dates, setDates] = useState(() => {
    return;
  });

  return (
    <div
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <CometCard background="white" dropShadow={1}>
        <CometMemoriesDatesSettingsInput />
      </CometCard>
    </div>
  );
};
