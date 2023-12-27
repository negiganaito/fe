/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { CometFormSelectOnlyCombobox } from "@/faang/combo-box";
import { TetraButton } from "@/faang/tetra-button";
import { TetraText, TetraTextPairing } from "@/faang/tetra-text";
// eslint-disable-next-line no-unused-vars
import { WorkSigninPasswordTextBox } from "@/faang/text-box";

// eslint-disable-next-line react/prop-types
export const HomePage = () => {
  const [comboboxValue, setComboboxValue] = React.useState("MARRIED_NAME");

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        {/* <TetraText align="center" type="headlineEmphasized2">
        Create a post in News Feed
      </TetraText> */}

        {/* <TetraTextPairing
        headline="Feed"
        level={2}
        body={
          <TetraText color="secondary" type="body4">
            Discover posts from across your organization
          </TetraText>
        }
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: ".5rem",
        }}
      >
        <TetraButton
          type="primary"
          tooltip="Hello"
          tooltipPosition="start"
          padding="wide"
          label="Create post"
        />
        <TetraButton type="secondary" padding="wide" label="Create post" />
        <TetraButton type="dark-overlay" padding="wide" label="Create post" />
        <TetraButton
          type="fdsOverride_black"
          padding="wide"
          label="Create post"
        />
        <TetraButton
          type="fdsOverride_collaborativePostCTA"
          padding="wide"
          label="Create post"
        />
        <TetraButton
          type="fdsOverride_negative"
          padding="wide"
          label="Create post"
        />
        <TetraButton
          type="fdsOverride_positive"
          padding="wide"
          label="Create post"
        />
        <TetraButton type="overlay" padding="wide" label="Create post" />
      </div> */}
        {/* <WorkSigninPasswordTextBox
        autoFocus={false}
        dataTestId="login_password"
        disabled={false}
        label="Password"
        name="pass"
        type="password"
        value=""
      /> */}

        <div style={{ width: "400px" }}>
          <CometFormSelectOnlyCombobox
            disabled={false}
            label="Name type"
            value={comboboxValue}
            onValueChange={setComboboxValue}
            options={[
              {
                label: "Nickname",
                value: "NICKNAME",
              },
              {
                label: "Maiden Name",
                value: "MAIDEN_NAME",
              },
              {
                label: "Alternate Spelling",
                value: "ALTERNATE_SPELLING",
              },
              {
                label: "Married Name",
                value: "MARRIED_NAME",
              },
              {
                label: "Father's Name",
                value: "FATHERS_NAME",
              },
              {
                label: "Birth Name",
                value: "BIRTH_NAME",
              },
              {
                label: "Former Name",
                value: "FORMER_NAME",
              },
              {
                label: "Name with Title",
                value: "NAME_WITH_TITLE",
              },
              {
                label: "Other",
                value: "OTHER",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
