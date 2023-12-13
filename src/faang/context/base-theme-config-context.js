import { createContext } from 'react';

/**
 * @type {import("react").Context<import("./types").BaseThemeConfigContextProps>}
 */
export const BaseThemeConfigContext = createContext({
  darkClassName: null,
  darkVariables: {},
  lightClassName: null,
  lightVariables: {},
});
