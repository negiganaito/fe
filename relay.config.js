/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
module.exports = {
  excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],

  language: "javascript",

  // "javascript" | "typescript" | "flow"
  schema: "./data/schema.graphql",

  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: "./src",
};
