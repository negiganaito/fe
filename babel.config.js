// babel.config.js

// eslint-disable-next-line no-undef
const styleXPlugin = require('@stylexjs/babel-plugin');
// eslint-disable-next-line no-undef
const path = require('path');

const config = {
  presets: ['@babel/preset-react'],
  plugins: [
    ['react-hot-loader/babel'],
    ['relay'],
    [
      styleXPlugin,
      {
        dev: true,
        // Set this to true for snapshot testing
        // default: false
        test: false,
        // Required for CSS variable support
        unstable_moduleResolution: {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: 'commonJS',
          // The absolute path to the root directory of your project
          // eslint-disable-next-line no-undef
          rootDir: __dirname,
        },
      },
    ],
    [
      'babel-plugin-fbt',
      {
        // fbtCommonPath: './common_strings.json',
        // We can also provide the fbt enum manifest directly as a JS variable
        // fbtEnumManifest: require('./.enum_manifest.json'),
        // eslint-disable-next-line no-undef
        fbtEnumPath: path.join(__dirname, '.enum_manifest.json'),
      },
    ],
    ['babel-plugin-fbt-runtime'],
  ],
};

// eslint-disable-next-line no-undef
module.exports = config;
