// babel.config.js
import styleXPlugin from '@stylexjs/babel-plugin';

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
  ],
};

export default config;
