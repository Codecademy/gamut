import { AbstractTheme } from '@codecademy/gamut-system';
import { css, Global, ThemeProvider } from '@emotion/react';
import React from 'react';

import { theme as rawTheme } from './theme';

export const createVariables = <
  T extends AbstractTheme,
  K extends (keyof T)[],
  Registered extends Pick<T, K[number]>,
  MappedVars extends {
    [Key in keyof Registered]: {
      [Variable in keyof Registered[Key]]: any;
    };
  },
  ReturnedTheme extends T & MappedVars
>(
  theme: T,
  keys: K
): { vars: Record<string, string>; theme: ReturnedTheme } => {
  const vars: Record<string, string> = {};
  const themeVars = {} as Record<string, Record<string, string>>;

  keys.forEach((key: string) => {
    const varsToRegister = theme[key];
    themeVars[key] = {} as Record<string, string>;
    Object.keys(varsToRegister).forEach((variable: string) => {
      const varName = `--${variable}`;
      vars[varName] = varsToRegister[variable];
      themeVars[key][variable] = `var(${varName})`;
    });
  });

  return { vars, theme: { ...theme, ...themeVars } as ReturnedTheme };
};

export const { theme, vars } = createVariables(rawTheme, ['elements']);

export type ThemeShape = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeShape {}
}

export const GamutThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={css({ ':root': vars })} />
      {children}
    </ThemeProvider>
  );
};
