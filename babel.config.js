// babel.config.js

const styleXPlugin = require('@stylexjs/babel-plugin');
const reactHotReload = require('react-hot-loader/babel');

const config = {
  presets: ['@babel/preset-react'],
  plugins: [
    [reactHotReload],
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
          rootDir: __dirname,
        },
      },
    ],
  ],
};

module.exports = config;
