/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const env = {
  ajaxpipe_token: null,
  compat_iframe_token: null,
  iframeKey: "",
  iframeTarget: "",
  iframeToken: "",
  isCQuick: !1,
  jssp_header_sent: !1,
  jssp_targeting_enabled: !1,
  loadHyperion: !1,
  start: Date.now(),
  nocatch: !1,
  useTrustedTypes: !1,
  isTrustedTypesReportOnly: !1,
  enableDefaultTrustedTypesPolicy: !1,
  ig_server_override: "",
  barcelona_server_override: "",
  ig_mqtt_wss_endpoint: "",
  ig_mqtt_polling_endpoint: "",
};

window.Env && Object.assign(env, window.Env);
window.Env = env;

export { env };
