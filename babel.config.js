/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// eslint-disable-next-line no-undef
const styleXPlugin = require("@stylexjs/babel-plugin");

// eslint-disable-next-line no-undef
const path = require("path");

const config = {
  plugins: [
    ["react-hot-loader/babel"],
    ["relay"],
    [
      styleXPlugin,
      {
        dev: true,
        // Set this to true for snapshot testing
        // default: false
        test: false,
        // Required for CSS variable support
        unstable_moduleResolution: {
          // The absolute path to the root directory of your project
          // eslint-disable-next-line no-undef
          rootDir: __dirname,

          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: "commonJS",
        },
      },
    ],
    [
      "babel-plugin-fbt",
      {
        // eslint-disable-next-line no-undef
        fbtCommonPath: path.join(__dirname, "i18n/fbt/common_strings.json"),
      },
    ],
    "babel-plugin-fbt-runtime",
  ],
  presets: ["@babel/preset-react"],
};

// eslint-disable-next-line no-undef
module.exports = config;
