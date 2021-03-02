import { AbstractTheme } from '@codecademy/gamut-system';
import { CSSObject } from '@emotion/react';
import { hasIn, isObject, mapKeys, mapValues, merge } from 'lodash';

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
  key: string
): key is keyof Required<AbstractTheme>['breakpoints'] =>
  Object.keys(['xs', 'sm', 'md', 'lg', 'xl']).includes(key);

export const createVariables = (
  tokens: Record<string, string | number | CSSObject>
) => {
  const cssVariables: CSSObject = {};

  for (const variable in tokens) {
    if (hasIn(tokens, variable)) {
      const varName = `--${variable}`;
      const valuesToRegister = tokens[variable];

      // For all variables in the theme scale add theme to the resulting CSS Object
      switch (typeof valuesToRegister) {
        // If the value is primitive just add it as is to the returned vars css object
        case 'number':
        case 'string':
          cssVariables[varName] = valuesToRegister;
          break;
        // If the value is an object then attempt to parse it as a resposnive property
        case 'object':
          const { base, ...otherSelectors } = valuesToRegister;

          // If base key is defined add it to the root values
          if (base) {
            cssVariables[varName] = base;
          }

          // If there are remaining breakpoints that override the root value add them to style object
          const selectors = Object.keys(otherSelectors);
          if (selectors) {
            const valuesByMediaQuery: CSSObject = {};
            selectors.forEach((key) => {
              valuesByMediaQuery[key] = {
                [varName]: valuesToRegister[key],
              };
            });

            // Merge to preserve all breakpoints
            merge(cssVariables, valuesByMediaQuery);
          }
          break;
        default:
          break;
      }

      // Add variable reference as the theme key's value
    }
  }
  return cssVariables;
};

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
    const replacedBreakpointAliases = mapValues(tokensToSerialize, (val) => {
      if (!isObject(val)) return val;
      return mapKeys(val, (key) =>
        isBreakpoint(key) ? theme.breakpoints[key] : key
      );
    });

    // Create the variables and merge with the rest of the vars
    merge(cssVariables, createVariables(replacedBreakpointAliases));
  });

  return { cssVariables, theme: updatedTheme };
};
