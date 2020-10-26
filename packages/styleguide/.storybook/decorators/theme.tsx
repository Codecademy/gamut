import React from 'react';
import { ThemeProvider } from '@codecademy/gamut-styles';

export const withTheme = (Story) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
