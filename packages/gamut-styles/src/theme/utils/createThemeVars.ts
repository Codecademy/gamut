import { AbstractTheme } from '@codecademy/gamut-system';
import { CSSObject } from '@emotion/react';
import { get, hasIn, omit } from 'lodash';

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
  <Theme extends AbstractTheme, VariableKeys extends (keyof Theme)[]>(
    theme: Theme,
    keys: VariableKeys
  ): {
    vars: CSSObject;
    theme: ThemeWithVariables<Theme, VariableKeys>;
  };
}

export const createThemeVars: CreateThemeVars = (theme, keys) => {
  // Create an empty theme to merge with the base theme object
  const updatedTheme = { ...theme };
  // Treat all CSS Variables as a plain emotion CSSObject to be added to.
  const vars: CSSObject = {};

  keys.forEach((key) => {
    const varsToRegister = theme[key];

    for (const variable in varsToRegister) {
      if (hasIn(varsToRegister, variable)) {
        const varName = `--${variable}`;
        const valuesToRegister = varsToRegister[variable];

        // For all variables in the theme scale add theme to the resulting CSS Object
        switch (typeof valuesToRegister) {
          // If the value is primitive just add it as is to the returned vars css object
          case 'number':
          case 'string':
            vars[varName] = valuesToRegister;
            break;
          // If the value is an object then attempt to parse it as a resposnive property
          case 'object':
            Object.assign(vars, {
              // Add the base as the default variable value
              [varName]: get(valuesToRegister, 'base'),
              // Add a variable override at each breakpoint specified
              ...Object.keys(omit(valuesToRegister, 'base')).reduce(
                (carry, key) => ({
                  ...carry,
                  [get(theme.breakpoints, key)]: {
                    [varName]: valuesToRegister[key],
                  },
                }),
                {}
              ),
            });
            break;
          default:
            break;
        }

        // Add variable reference as the theme key's value
        updatedTheme[key][variable] = `var(${varName})`;
      }
    }
  });

  return { vars, theme: updatedTheme };
};
