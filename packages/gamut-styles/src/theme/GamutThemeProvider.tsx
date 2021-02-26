import { css, Global, ThemeProvider } from '@emotion/react';
import React from 'react';

import { theme as rawTheme } from './theme';
import { createThemeVars } from './utils/createThemeVars';

export const { theme, vars } = createThemeVars(rawTheme, ['elements']);

export const GamutThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={css({ ':root': vars })} />
      {children}
    </ThemeProvider>
  );
};
