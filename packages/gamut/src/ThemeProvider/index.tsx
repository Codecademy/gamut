import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { theme } from '@codecademy/gamut-styles';

export const ThemeProvider: React.FC = ({ ...props }) => {
  return <EmotionThemeProvider {...props} theme={theme}></EmotionThemeProvider>;
};
