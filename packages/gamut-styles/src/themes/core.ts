import { createTheme } from '@codecademy/variance';

import {
  boxShadows,
  colors,
  elements,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  mediaQueries,
  spacing,
} from '../variables';

export const coreTheme = createTheme({
  boxShadows,
  breakpoints: mediaQueries,
  fontSize,
  fontFamily,
  lineHeight,
  fontWeight,
  spacing,
  elements,
})
  .addColors(colors)
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
