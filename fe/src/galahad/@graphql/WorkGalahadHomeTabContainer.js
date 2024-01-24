/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { graphql } from "react-relay";

export const workGalahadHomeTabContainerQueryQuery = graphql`
  query WorkGalahadHomeTabContainerQuery {
    
  }
`;

a = (function () {
  let a = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "groupCount",
  };
  let b = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "hasMessengerThread",
  };
  let c = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "id",
  };
  let d = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "isHybridLeftNav",
  };
  let e = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "peopleCount",
  };
  let f = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "scale",
  };
  let g = {
    defaultValue: null,
    kind: "LocalArgument",
    name: "user",
  };
  let h = {
    kind: "Variable",
    name: "scale",
    variableName: "scale",
  };
  let i = [
    {
      kind: "Variable",
      name: "id",
      variableName: "id",
    },
  ];
  let j = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "can_create_group",
    storageKey: null,
  };
  let k = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "__typename",
    storageKey: null,
  };
  let l = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "id",
    storageKey: null,
  };
  let m = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "secondary_subscribe_status",
    storageKey: null,
  };
  let n = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "name",
    storageKey: null,
  };
  let o = {
    alias: null,
    args: [
      {
        kind: "Literal",
        name: "height",
        value: 36,
      },
      h,
      {
        kind: "Literal",
        name: "width",
        value: 36,
      },
    ],
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
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "scale",
        storageKey: null,
      },
    ],
    storageKey: null,
  };
  let p = {
    kind: "InlineFragment",
    selections: [o],
    type: "Actor",
    abstractKey: "__isActor",
  };
  let q = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "work_official_status",
    storageKey: null,
  };
  let r = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "is_multi_company_group",
    storageKey: null,
  };
  let s = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "url",
    storageKey: null,
  };
  let t = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "is_subcommunity",
    storageKey: null,
  };
  let u = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "has_viewer_favorited",
    storageKey: null,
  };
  let v = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "is_viewer_member",
    storageKey: null,
  };
  let w = {
    alias: null,
    args: null,
    concreteType: "GroupsSyncMetadata",
    kind: "LinkedField",
    name: "work_groups_sync_metadata",
    plural: !1,
    selections: [
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "messenger_group",
        plural: !1,
        selections: [k, l],
        storageKey: null,
      },
    ],
    storageKey: null,
  };
  let x = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "work_membership_mandate_status",
    storageKey: null,
  };
  let y = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "unread_count",
    storageKey: null,
  };
  let z = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "work_group_is_guest_enabled",
    storageKey: null,
  };
  let A = [
    {
      alias: null,
      args: null,
      concreteType: "Group",
      kind: "LinkedField",
      name: "nodes",
      plural: !0,
      selections: [l, s, n, p, q, r, t, u, v, m, w, x, y, z],
      storageKey: null,
    },
  ];
  let B = [
    {
      kind: "Variable",
      name: "first",
      variableName: "peopleCount",
    },
  ];
  let C = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "cursor",
    storageKey: null,
  };
  let D = {
    alias: null,
    args: null,
    concreteType: "PageInfo",
    kind: "LinkedField",
    name: "page_info",
    plural: !1,
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "end_cursor",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "has_next_page",
        storageKey: null,
      },
    ],
    storageKey: null,
  };
  let E = {
    kind: "Literal",
    name: "first",
    value: 1,
  };
  let F = {
    kind: "Literal",
    name: "is_subcommunity",
    value: !0,
  };
  let G = {
    kind: "Literal",
    name: "orderby",
    value: ["importance"],
  };
  let H = {
    kind: "Variable",
    name: "first",
    variableName: "groupCount",
  };
  let I = {
    kind: "Literal",
    name: "is_viewer_favorite",
    value: !1,
  };
  let J = {
    kind: "Literal",
    name: "exclude_work_communities",
    value: !0,
  };
  let K = {
    kind: "Literal",
    name: "orderby",
    value: ["top_groups_with_unseen_posts"],
  };
  let L = {
    kind: "Variable",
    name: "work_has_messenger_thread",
    variableName: "hasMessengerThread",
  };
  let M = [
    {
      alias: null,
      args: null,
      concreteType: "Group",
      kind: "LinkedField",
      name: "nodes",
      plural: !0,
      selections: [l, m, s, n, p, q, r, t, u, v, w, x, y, z],
      storageKey: null,
    },
  ];
  let N = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "is_eligible_for_work_see_first_groups_upsell",
    storageKey: null,
  };
  let O = {
    alias: null,
    args: null,
    concreteType: "Group",
    kind: "LinkedField",
    name: "parent_group",
    plural: !1,
    selections: [l],
    storageKey: null,
  };
  let P = {
    kind: "Literal",
    name: "first",
    value: 50,
  };
  let Q = [P];
  return {
    fragment: {
      argumentDefinitions: [a, b, c, d, e, f, g],
      kind: "Fragment",
      metadata: null,
      name: "WorkGalahadHomeTabContainerQuery",
      selections: [
        {
          kind: "Defer",
          selections: [
            {
              args: [
                {
                  kind: "Variable",
                  name: "groupCount",
                  variableName: "groupCount",
                },
                {
                  kind: "Variable",
                  name: "hasMessengerThread",
                  variableName: "hasMessengerThread",
                },
                {
                  kind: "Variable",
                  name: "isHybridLeftNav",
                  variableName: "isHybridLeftNav",
                },
                {
                  kind: "Variable",
                  name: "peopleCount",
                  variableName: "peopleCount",
                },
                h,
                {
                  kind: "Variable",
                  name: "user",
                  variableName: "user",
                },
              ],
              kind: "FragmentSpread",
              name: "ChannelGeminiHomeTabContent_query",
            },
          ],
        },
        {
          alias: null,
          args: null,
          concreteType: "Viewer",
          kind: "LinkedField",
          name: "viewer",
          plural: !1,
          selections: [
            {
              alias: null,
              args: i,
              concreteType: null,
              kind: "LinkedField",
              name: "work_app_tab",
              plural: !1,
              selections: [
                {
                  args: null,
                  kind: "FragmentSpread",
                  name: "ChannelGeminiSectionsList_tab",
                },
              ],
              storageKey: null,
            },
            j,
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [a, e, g, f, d, b, c],
      kind: "Operation",
      name: "WorkGalahadHomeTabContainerQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Viewer",
          kind: "LinkedField",
          name: "viewer",
          plural: !1,
          selections: [
            {
              alias: null,
              args: i,
              concreteType: null,
              kind: "LinkedField",
              name: "work_app_tab",
              plural: !1,
              selections: [
                k,
                {
                  kind: "TypeDiscriminator",
                  abstractKey: "__isWorkAppTab",
                },
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: "LinkedField",
                  name: "sections",
                  plural: !0,
                  selections: [
                    k,
                    {
                      kind: "TypeDiscriminator",
                      abstractKey: "__isIWorkGalahadSection",
                    },
                    {
                      alias: null,
                      args: [
                        {
                          kind: "Literal",
                          name: "supported",
                          value: "33W5KV",
                        },
                      ],
                      concreteType: null,
                      kind: "LinkedField",
                      name: "renderer",
                      plural: !1,
                      selections: [
                        k,
                        {
                          kind: "InlineFragment",
                          selections: [
                            {
                              args: null,
                              documentName:
                                "ChannelGeminiSectionContainer_section",
                              fragmentName:
                                "ChannelGeminiSectionWithBookmarks_sectionRenderer",
                              fragmentPropName: "sectionRenderer",
                              kind: "ModuleImport",
                            },
                          ],
                          type: "WorkGalahadSectionWithBookmarksRenderer",
                          abstractKey: null,
                        },
                        {
                          kind: "InlineFragment",
                          selections: [
                            {
                              args: null,
                              documentName:
                                "ChannelGeminiSectionContainer_section",
                              fragmentName:
                                "ChannelGeminiAdvancedAdminSection_sectionRenderer",
                              fragmentPropName: "sectionRenderer",
                              kind: "ModuleImport",
                            },
                          ],
                          type: "WorkGalahadAdvancedAdminSectionRenderer",
                          abstractKey: null,
                        },
                      ],
                      storageKey: 'renderer(supported:"33W5KV")',
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            j,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: "7064228296988492",
      metadata: {},
      name: "WorkGalahadHomeTabContainerQuery",
      operationKind: "query",
      text: null,
    },
  };
})();
