/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { CometMemoriesNotificationsCardContainer } from "@/faang/@example";
import { CometCheckbox } from "@/faang/checkbox";
import { CometFormSelectOnlyCombobox } from "@/faang/combo-box";
import {
  CometFormDateInput,
  CometFormDateTimeConstraints,
} from "@/faang/date-range";
import { fbicon } from "@/faang/icon";
import { CometSelect } from "@/faang/select";
import { TetraButton, TetraCircleButton } from "@/faang/tetra-button";
import { TetraText, TetraTextPairing } from "@/faang/tetra-text";
import { CometFormTextArea } from "@/faang/text-area";
// eslint-disable-next-line no-unused-vars
import { WorkSigninPasswordTextBox } from "@/faang/text-box";
import { ix } from "@/faang/utils";

import { CometSwitch } from "../../faang/switch";

const layoutAppQuery = graphql`
  query layoutGreetingsQuery {
    greetings
  }
`;

// eslint-disable-next-line react/prop-types
export const HomePage = () => {
  const data = useLazyLoadQuery(layoutAppQuery, {});

  console.log({ data });

  const [comboboxValue, setComboboxValue] = React.useState("MARRIED_NAME");
  const [selectValue, setSelectValue] = React.useState("SINGLE");

  const [state, setState] = React.useState(
    "だれでもない。だれ　でもいたくないです。"
  );
  const [switchVal, setSwitchVal] = React.useState(true);
  const [date, setDate] = useState(null);

  const [timeline, showTimeline] = useState(true);

  const onTimelineChange = useCallback(() => {
    showTimeline(!timeline);
  }, [timeline, showTimeline]);

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
        <TetraText align="center" type="headlineEmphasized2">
          Create a post in News Feed
        </TetraText>

        <TetraTextPairing
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
            tooltip="This is tooltip"
            tooltipPosition="start"
            padding="wide"
            label="Create post with tooltip"
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
        </div>
        <div style={{ width: "400px" }}>
          <WorkSigninPasswordTextBox
            autoFocus={false}
            dataTestId="login_password"
            disabled={false}
            label="Password"
            name="pass"
            type="password"
            value=""
          />
        </div>
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

        <div style={{ width: "400px" }}>
          <CometSelect
            testid={undefined}
            selectedValue={selectValue}
            options={[
              {
                label: "Status",
                testid: "ProfileCometRelationshipStatusOption-Status",
                value: "UNSPECIFIED",
              },
              {
                label: "Single",
                testid: "ProfileCometRelationshipStatusOption-Single",
                value: "SINGLE",
              },
              {
                label: "In a relationship",
                testid:
                  "ProfileCometRelationshipStatusOption-In a relationship",
                value: "IN_A_RELATIONSHIP",
              },
              {
                label: "Engaged",
                testid: "ProfileCometRelationshipStatusOption-Engaged",
                value: "ENGAGED",
              },
              {
                label: "Married",
                testid: "ProfileCometRelationshipStatusOption-Married",
                value: "MARRIED",
              },
              {
                label: "In a civil union",
                testid: "ProfileCometRelationshipStatusOption-In a civil union",
                value: "CIVIL_UNION",
              },
              {
                label: "In a domestic partnership",
                testid:
                  "ProfileCometRelationshipStatusOption-In a domestic partnership",
                value: "DOMESTIC_PARTNERSHIP",
              },
              {
                label: "In an open relationship",
                testid:
                  "ProfileCometRelationshipStatusOption-In an open relationship",
                value: "OPEN_RELATIONSHIP",
              },
              {
                label: "It's complicated",
                testid: "ProfileCometRelationshipStatusOption-It's complicated",
                value: "COMPLICATED",
              },
              {
                label: "Separated",
                testid: "ProfileCometRelationshipStatusOption-Separated",
                value: "SEPARATED",
              },
              {
                label: "Divorced",
                testid: "ProfileCometRelationshipStatusOption-Divorced",
                value: "DIVORCED",
              },
              {
                label: "Widowed",
                testid: "ProfileCometRelationshipStatusOption-Widowed",
                value: "WIDOWED",
              },
            ]}
            onChange={(val) => {
              setSelectValue(val);
            }}
          />
        </div>

        <TetraCircleButton
          icon={fbicon._(ix(477831), 20)}
          label="Edit"
          size={36}
          linkProps={{
            url: "/login",
          }}
        />

        <div style={{ width: "400px" }}>
          <CometFormTextArea
            label="Favorite quotes"
            disabled={false}
            value={state}
            onValueChange={(val, e) => {
              setState(val);
            }}
            minRows={3}
          />
        </div>

        <CometCheckbox
          checked={timeline}
          label="Show on my timeline"
          name="is_visible"
          onChange={onTimelineChange}
          testid={undefined}
          value={timeline}
        />

        <div style={{ width: "400px" }}>
          <CometFormDateInput
            constraints={[CometFormDateTimeConstraints.dateInThePast(true)]}
            date={date}
            label="Add start date"
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </div>

        <CometSwitch
          disabled={false}
          size="medium"
          value={switchVal}
          onClick={() => setSwitchVal(!switchVal)}
        />

        <CometMemoriesNotificationsCardContainer />

        <div style={{ height: "1rem" }} />
      </div>
    </div>
  );
};
