import { createTheme } from '@codecademy/variance';

import * as tokens from './variables';

export const { theme, variables, getColorValue } = createTheme({
  boxShadows: tokens.boxShadows,
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  spacing: tokens.spacing,
  elements: tokens.elements,
})
  .addColors(tokens.colors)
  .addColorModes('light', {
    light: {
      primary: 'hyper',
      secondary: 'navy',
      text: 'navy',
      background: 'white',
      shadow: 'lightShadow',
    },
    dark: {
      primary: 'yellow',
      secondary: 'white',
      text: 'white',
      background: 'navy',
      shadow: 'darkShadow',
    },
  })
  .addScale('borders', ({ colors }) => ({
    1: `1px solid ${colors.secondary}`,
    2: `2px solid ${colors.secondary}`,
  }))
  .createScaleVariables('elements')
  .build();
