// relay.config.js
// eslint-disable-next-line no-undef
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './src',
  language: 'javascript', // "javascript" | "typescript" | "flow"
  schema: './data/schema.graphql',
  excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
