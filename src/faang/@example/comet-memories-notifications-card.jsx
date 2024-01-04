/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { TetraList, TetraListCell } from "@/faang/list";
import { CometUnitHeader, TetraText } from "@/faang/tetra-text";

const styles = stylex.create({
  header: {
    paddingTop: "8px",
  },

  radio: {
    paddingBottom: "24px",
    paddingTop: "8px",
  },
});

export const CometMemoriesNotificationsCard = () => {
  return (
    <>
      <CometUnitHeader
        body={
          <div className={stylex(styles.header)}>
            <fbt
              desc="You can choose how often you want to be notified about your
            memories"
            >
              You can choose how often you want to be notified about your
              memories.
            </fbt>
          </div>
        }
        headline="Notifications"
        level={3}
      />
      <div className={stylex(styles.radio)}>
        <TetraList>
          <TetraListCell
            addOnSecondary={{
              "aria-label": fbt("All Memories", "All Memories"),
              on: false,
              type: "radio",
              onPress: () => {},
            }}
            body={
              <TetraText color="secondary" type="body4">
                <fbt desc="We'll notify you no more than once a day.">
                  We'll notify you no more than once a day.
                </fbt>
              </TetraText>
            }
            hasBottomDivider
            headline={
              <TetraText type="headline4">
                <fbt desc="All Memories">All Memories</fbt>
              </TetraText>
            }
            onPress={() => {}}
          />
          <TetraListCell
            addOnSecondary={{
              "aria-label": fbt("Highlights", "Highlights"),
              on: true,
              type: "radio",
              onPress: () => {},
            }}
            body={
              <TetraText color="secondary" type="body4">
                <fbt desc="We'll periodically update you about select memories.">
                  We'll periodically update you about select memories.
                </fbt>
              </TetraText>
            }
            hasBottomDivider
            headline={
              <TetraText type="headline4">
                <fbt desc="Highlights">Highlights</fbt>
              </TetraText>
            }
            onPress={() => {}}
          />
          <TetraListCell
            addOnSecondary={{
              "aria-label": fbt("None", "None"),
              on: false,
              type: "radio",
              onPress: () => {},
            }}
            body={
              <TetraText color="secondary" type="body4">
                <fbt desc="We won't notify you about memories.">
                  We won't notify you about memories.
                </fbt>
              </TetraText>
            }
            hasBottomDivider
            headline={
              <TetraText type="headline4">
                <fbt desc="None">None</fbt>
              </TetraText>
            }
            onPress={() => {}}
          />
        </TetraList>
      </div>
    </>
  );
};
