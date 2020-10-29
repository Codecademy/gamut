import React from 'react';
import { ThemeContext } from '@emotion/react';

export const withThemeContext = (Story) => (
  <ThemeContext.Provider value={{}}>
    <Story />
  </ThemeContext.Provider>
);
