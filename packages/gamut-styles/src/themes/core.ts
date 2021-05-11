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
      primaryDull: 'hyper-400',
      secondary: 'navy',
      secondaryDull: 'gray-600',
      text: 'navy',
      textMuted: 'gray-600',
      background: 'white',
      backgroundMuted: 'gray-200',
      backgroundEmphasized: 'gray-100',
      shadow: {
        transparent: 'lightShadow',
        opaque: 'gray-200',
      },
    },
    dark: {
      primary: 'yellow',
      primaryDull: 'yellow-400',
      secondary: 'white',
      secondaryDull: 'gray-200',
      text: 'white',
      textMuted: 'gray-200',
      background: 'navy',
      backgroundMuted: 'gray-600',
      backgroundEmphasized: 'blue-800',
      shadow: {
        transparent: 'darkShadow',
        opaque: 'black',
      },
    },
  })
  .addScale('borders', ({ colors }) => ({
    1: `1px solid ${colors.secondary}`,
    2: `2px solid ${colors.secondary}`,
  }))
  .createScaleVariables('elements')
  .build();
