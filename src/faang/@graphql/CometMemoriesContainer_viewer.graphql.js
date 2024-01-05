/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export const CometMemoriesContainer_viewer = {
  argumentDefinitions: [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "cursor",
    },
  ],
  kind: "Fragment",
  metadata: null,
  name: "CometMemoriesContainer_viewer",
  selections: [
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "device_id",
          value: "1",
        },
        {
          kind: "Literal",
          name: "throwback_permalink_source_story_id",
          value: 0,
        },
      ],
      concreteType: "GoodwillThrowbackQuery",
      kind: "LinkedField",
      name: "throwback",
      plural: !1,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "GoodwillThrowbackSettings",
          kind: "LinkedField",
          name: "throwback_settings",
          plural: !1,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "GoodwillThrowbackDateRange",
              kind: "LinkedField",
              name: "filtered_dates",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "start_day",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "end_day",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "User",
              kind: "LinkedField",
              name: "filtered_users",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "id",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "name",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "Image",
                  kind: "LinkedField",
                  name: "profile_picture",
                  plural: !1,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "uri",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "subscription_status",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          args: null,
          kind: "FragmentSpread",
          name: "CometMemoriesFeed_query",
        },
      ],
      storageKey:
        'throwback(device_id:"1",throwback_permalink_source_story_id:0)',
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "CometMemoriesFeed_viewer",
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "CometMemoriesDatesSettingsInput_viewer",
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "CometMemoriesNotificationsCard_viewer",
    },
  ],
  type: "Viewer",
  abstractKey: null,
};
