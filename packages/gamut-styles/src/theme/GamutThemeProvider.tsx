import { css, Global, ThemeProvider } from '@emotion/react';
import React from 'react';

import { theme as rawTheme } from './theme';
import { createThemeVariables } from './utils/createVariables';

export const { theme, cssVariables } = createThemeVariables(rawTheme, [
  'elements',
]);

export const GamutThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={css({ ':root': cssVariables })} />
      {children}
    </ThemeProvider>
  );
};
