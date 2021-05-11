import { createTheme } from '@codecademy/variance';

import {
  boxShadows,
  corePalette,
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
  .addColors(corePalette)
  .addColorModes('light', {
    light: {
      primary: 'hyper',
      primaryDull: 'hyper-400',
      secondary: 'navy',
      secondaryDull: 'gray-600',
      danger: 'red',
      success: 'green',
      text: 'navy',
      textMuted: 'gray-600',
      background: 'white',
      backgroundMuted: 'gray-200',
      backgroundEmphasized: 'gray-100',
      shadow: {
        transparent: 'whiteShadow',
        opaque: 'gray-200',
      },
    },
    dark: {
      primary: 'yellow',
      primaryDull: 'yellow-400',
      secondary: 'white',
      secondaryDull: 'gray-200',
      danger: 'paleRed',
      success: 'lightGreen',
      text: 'white',
      textMuted: 'gray-200',
      background: 'navy',
      backgroundMuted: 'gray-600',
      backgroundEmphasized: 'blue-800',
      shadow: {
        transparent: 'blackShadow',
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
