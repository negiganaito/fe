/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */



const restrictedGlobals = require('confusing-browser-globals');

const OFF = 0;
const ERROR = 2;

module.exports = {
  // Prettier must be last so it can override other configs (https://github.com/prettier/eslint-config-prettier#installation)
  extends: [
    'fbjs',
    'plugin:react-hooks/recommended',
    // 'plugin:lexical/all',
    'prettier',
  ],

  globals: {
    JSX: true,
    __DEV__: true,
  },

  overrides: [
    {
      // We apply these settings to the source files that get compiled.
      // They can use all features including JSX (but shouldn't use `var`).
      files: [
        'packages/*/src/**/*.js',
        'packages/*/__tests__/**/*.?(m)js',
        'packages/*/src/**/*.jsx',
      ],
      parser: '@babel/eslint-parser',
      parserOptions: {
        allowImportExportEverywhere: true,
        sourceType: 'module',

      },
      rules: {
        'no-var': ERROR,
        'prefer-const': ERROR,
        strict: OFF,
      },
    },
    {
      // node scripts should be console logging so don't lint against that
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': OFF,
      },
    },
    {
      env: {
        browser: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
      plugins: ['react', '@typescript-eslint', 'header'],
      rules: {
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/no-this-alias': OFF,
        '@typescript-eslint/no-unused-vars': [ERROR, { args: 'none' }],
        'header/header': [2, 'scripts/www/headerTemplate.js'],
      },
    },
    {
      // don't lint headers in entrypoint files so we can add TypeDoc module comments
      files: ['packages/**/src/index.ts'],
      rules: {
        'header/header': OFF,
      },
    },
    {
      files: [
        'packages/**/src/__tests__/**',
        'packages/lexical-playground/**',
        'packages/lexical-devtools/**',
      ],
      rules: {
        'lexical/no-optional-chaining': OFF,
      },
    },
  ],

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 11,
    requireConfigFile: false,
    sourceType: 'module',
  },

  plugins: [
    'sort-keys-fix',
    'simple-import-sort',
    'header',

    // import helps to configure simple-import-sort
    'import',
    'no-function-declare-after-return',
    'react',
    'no-only-tests',
    '@stylexjs'
  ],

  // Stop ESLint from looking for a configuration file in parent folders
  root: true,
  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some React specific ones.
  rules: {
    '@stylexjs/valid-styles': [
      'error'
    ],

    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs'],
    'consistent-return': OFF,

    'dot-location': [ERROR, 'property'],

    // We use console['error']() as a signal to not transform it:
    'dot-notation': [ERROR, { allowPattern: '^(error|warn)$' }],
    'eol-last': ERROR,

    eqeqeq: [ERROR, 'allow-null'],


    'header/header': [2, 'scripts/www/headerTemplate.js'],


    // (This helps configure simple-import-sort) Make sure all imports are at the top of the file
    'import/first': ERROR,


    // (This helps configure simple-import-sort) Make sure there's a newline after the imports
    'import/newline-after-import': ERROR,

    // (This helps configure simple-import-sort) Merge imports of the same file
    'import/no-duplicates': ERROR,

    indent: OFF,

    'jsx-quotes': [ERROR, 'prefer-double'],





    'keyword-spacing': [ERROR, { after: true, before: true }],

    // Enforced by Prettier
    // TODO: Prettier doesn't handle long strings or long comments. Not a big
    // deal. But I turned it off because loading the plugin causes some obscure
    // syntax error and it didn't seem worth investigating.
    'max-len': OFF,

    'no-bitwise': OFF,

    'no-console': ERROR,


    'no-debugger': ERROR,

    // Prevent function declarations after return statements
    'no-function-declare-after-return/no-function-declare-after-return': ERROR,

    'no-inner-declarations': [ERROR, 'functions'],

    'no-multi-spaces': ERROR,

    'no-only-tests/no-only-tests': ERROR,

    'no-restricted-globals': [ERROR].concat(restrictedGlobals),

    'no-restricted-syntax': [ERROR, 'WithStatement'],

    'no-shadow': OFF, // ERROR

    'no-unused-expressions': OFF, // ERROR

    'no-unused-vars': [ERROR, { args: 'none' }],


    'no-use-before-define': OFF,

    'no-useless-computed-key': OFF,

    'no-useless-concat': OFF,

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    'no-var': ERROR,



    quotes: [ERROR, 'single', { allowTemplateLiterals: true, avoidEscape: true }],

    // React & JSX
    // Our transforms set this automatically
    'react/jsx-boolean-value': [ERROR, 'always'],


    'react/jsx-no-undef': ERROR,

    // We don't care to do this
    'react/jsx-sort-prop-types': OFF,

    'react/jsx-tag-spacing': ERROR,


    'react/jsx-uses-react': ERROR,


    // We don't care to do this
    'react/jsx-wrap-multilines': [
      ERROR,
      { assignment: false, declaration: false },
    ],


    'react/no-is-mounted': OFF,


    // This isn't useful in our test code
    'react/react-in-jsx-scope': ERROR,


    'react/self-closing-comp': ERROR,

    // This sorts re-exports (`export * from 'foo';`), but not other types of exports.
    'simple-import-sort/exports': ERROR,

    'simple-import-sort/imports': [
      ERROR,
      {
        // The default grouping, but with type imports first as a separate group.
        // See: https://github.com/lydell/eslint-plugin-simple-import-sort/blob/d9a116f71302c5dcfc1581fc7ded8d77392f1924/examples/.eslintrc.js#L122-L133
        groups: [['^.*\\u0000$'], ['^\\u0000'], ['^@?\\w'], ['^'], ['^\\.']],
      },
    ],

    'sort-keys-fix/sort-keys-fix': ERROR,

    'space-before-blocks': ERROR,

    'space-before-function-paren': OFF,
    strict: ERROR,

    'valid-typeof': [ERROR, { requireStringLiterals: true }]
  },
};
