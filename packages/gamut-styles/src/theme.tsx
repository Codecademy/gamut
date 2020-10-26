import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import * as tokens from './variables';

export const theme = {
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  colors: tokens.colors,
  spacing: tokens.spacing,
};

export type Theme = typeof theme;

export const ThemeProvider: React.FC = ({ ...props }) => {
  return <EmotionThemeProvider {...props} theme={theme} />;
};
