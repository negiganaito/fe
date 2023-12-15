/**
 * @type {import("prettier").Options}
 */
const config = {
  singleQuote: true,
  printWidth: 80,
  proseWrap: 'always',
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  semi: true,
  bracketSameLine: true,
  trailingComma: 'all',
  htmlWhitespaceSensitivity: 'ignore',
  attributeGroups: ['$DEFAULT', '^data-'],
  plugins: ['prettier-plugin-tailwindcss'],

};

module.exports = config;
