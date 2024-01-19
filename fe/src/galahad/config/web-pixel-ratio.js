/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const SiteData = {
  server_revision: 1010813980,
  client_revision: 1010813439,
  tier: "",
  push_phase: "C3",
  pkg_cohort: "HYP:gemini_pkg",
  haste_session: "19735.HYP:gemini_pkg.2.1..0.0",
  pr: 1,
  haste_site: "www",
  manifest_base_uri: "https://static.xx.fbcdn.net",
  manifest_origin: null,
  manifest_version_prefix: null,
  be_one_ahead: true,
  is_rtl: false,
  is_comet: true,
  is_experimental_tier: false,
  is_jit_warmed_up: false,
  hsi: "7323479584382745451",
  semr_host_bucket: "6",
  bl_hash_version: 2,
  skip_rd_bl: true,
  comet_env: 15,
  wbloks_env: false,
  ef_page: "WorkKnowledgeGeminiHomeRoute",
  compose_bootloads: true,
  spin: 4,
  __spin_r: 1010813439,
  __spin_b: "trunk",
  __spin_t: 1705130465,
  vip: "157.240.199.16",
};

export const WebPixelRatio = {
  get: () =>
    SiteData.pr && SiteData.pr > 0 ? SiteData.pr : window.devicePixelRatio || 1,
};
