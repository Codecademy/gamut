import { ThemeBuilder } from '@codecademy/variance';
import { cloneDeep } from 'lodash';

import * as tokens from './variables';

export const baseTheme = cloneDeep({
  boxShadows: tokens.boxShadows,
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  colors: tokens.colors,
  spacing: tokens.spacing,
  elements: tokens.elements,
} as const);

export const { theme, variables, staticTokens } = new ThemeBuilder({
  theme: baseTheme,
})
  .serialize('elements')
  .serialize('colors')
  .createColorMode('light', {
    light: {
      primary: 'hyper',
      secondary: 'navy',
      text: 'navy',
      background: 'white',
    },
    dark: {
      primary: 'yellow',
      secondary: 'white',
      text: 'white',
      background: 'navy',
    },
  });
