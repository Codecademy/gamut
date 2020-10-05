import React from 'react';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from 'emotion-theming';

export const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);
