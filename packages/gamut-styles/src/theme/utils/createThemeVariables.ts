import { AbstractTheme } from '@codecademy/gamut-system';
import { CSSObject } from '@emotion/react';
import { hasIn, isObject, mapKeys, mapValues, merge } from 'lodash';

import { createVariables } from './createVariables';

/**
 * Returns an type of any object with { key: 'var(--key) }
 */
export type KeyAsVariable<T extends Record<string, any>> = {
  [V in keyof T]: `var(--${Extract<V, string>})`;
};

/**
 * Updates the theme type with the correct new values of css variable references
 */
export type ThemeWithVariables<
  Theme extends AbstractTheme,
  VariableKeys extends (keyof Theme)[]
> = {
  [Key in keyof Theme]: Key extends VariableKeys[number]
    ? KeyAsVariable<Theme[Key]>
    : Theme[Key];
};

export interface CreateThemeVars {
  <Theme extends Required<AbstractTheme>, VariableKeys extends (keyof Theme)[]>(
    theme: Theme,
    keys: VariableKeys
  ): {
    cssVariables: CSSObject;
    theme: ThemeWithVariables<Theme, VariableKeys>;
  };
}

const isBreakpoint = (
  key: string,
  breakpoints: Required<AbstractTheme>['breakpoints']
): key is keyof Required<AbstractTheme>['breakpoints'] =>
  Object.keys(breakpoints).includes(key);

export const createThemeVariables: CreateThemeVars = (theme, keys) => {
  // Create an empty theme to merge with the base theme object
  const updatedTheme = { ...theme };
  // Treat all CSS Variables as a plain emotion CSSObject to be added to.
  const cssVariables: CSSObject = {};

  keys.forEach((key) => {
    const tokensToSerialize = theme[key];
    // Update the theme object with the new tokens
    for (const variable in tokensToSerialize) {
      if (hasIn(tokensToSerialize, variable)) {
        const variableReference = `var(--${variable}_`;
        updatedTheme[key][variable] = variableReference;
      }
    }

    // Replace breakpoint aliases with the actual selector
    const replacedBreakpointAliases = mapValues(tokensToSerialize, (val) =>
      isObject(val)
        ? mapKeys(val, (key) =>
            isBreakpoint(key, theme.breakpoints) ? theme.breakpoints[key] : key
          )
        : val
    );

    // Create the variables and merge with the rest of the vars
    merge(cssVariables, createVariables(replacedBreakpointAliases));
  });

  return { cssVariables, theme: updatedTheme };
};
