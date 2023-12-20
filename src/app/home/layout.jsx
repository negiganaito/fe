/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { TetraText, TetraTextPairing } from "@/faang/tetra-text";

// eslint-disable-next-line no-unused-vars
import { WorkSigninPasswordTextBox } from "@/faang/text-box";
import { TetraButton } from "@/faang/tetra-button";

// eslint-disable-next-line react/prop-types
export const HomePage = () => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {/* <TetraText align="center" type="headlineEmphasized2">
        Create a post in News Feed
      </TetraText> */}

      <TetraTextPairing
        headline="Feed"
        level={2}
        body={
          <TetraText color="secondary" type="body4">
            Discover posts from across your organization
          </TetraText>
        }
      />

      <TetraButton type="secondary" padding="wide" label="Create post" />

      {/* <WorkSigninPasswordTextBox
        autoFocus={false}
        dataTestId="login_password"
        disabled={false}
        label="Password"
        name="pass"
        type="password"
        value=""
      /> */}
    </div>
  );
};
