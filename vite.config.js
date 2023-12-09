import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

import styleX from "vite-plugin-stylex";
import styleXPlugin from "@stylexjs/babel-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
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
                type: "commonJS",
                // The absolute path to the root directory of your project
                rootDir: __dirname,
              },
            },
          ],
        ],
      },
    }),
    styleX(),
  ],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "src") }],
  },
});
