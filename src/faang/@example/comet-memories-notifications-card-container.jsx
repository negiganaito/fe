/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

import { CometCard, CometContentArea } from "@/faang/card";

import { CometMemoriesNotificationsCard } from ".";

export const CometMemoriesNotificationsCardContainer = () => {
  return (
    <CometContentArea>
      <div
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <CometCard background="white" dropShadow={1}>
          <CometMemoriesNotificationsCard />
        </CometCard>
      </div>
    </CometContentArea>
  );
};
