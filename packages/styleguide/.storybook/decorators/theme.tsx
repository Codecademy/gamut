import React from 'react';
import { ThemeContext } from '@emotion/react';
import { theme } from '@codecademy/gamut-styles';

export const withTheme = (Story) => {
  return (
    <ThemeContext.Provider value={theme}>
      <Story />
    </ThemeContext.Provider>
  );
};
