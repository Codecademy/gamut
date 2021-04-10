import { createTheme } from '@codecademy/variance';
import { cloneDeep } from 'lodash';

import * as tokens from './variables';

export const baseTheme = cloneDeep({
  boxShadows: tokens.boxShadows,
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  spacing: tokens.spacing,
  elements: tokens.elements,
} as const);

export const { theme, variables, getColorValue } = createTheme(baseTheme)
  .serialize('elements')
  .addColors(tokens.colors)
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
  })
  .build();
