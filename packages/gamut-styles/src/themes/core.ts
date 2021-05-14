import { createTheme } from '@codecademy/variance';

import {
  corePalette,
  elements,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  mediaQueries,
  spacing,
} from '../variables';

/**
 *  @description  This is the core theme that all other Codecademy themes are extended from
 * and is the only theme that gamut components are typed to. This ensures that gamut components
 * are guaranteed to be interoperable between all contexts, but with differing behaviors.
 */

export const coreTheme = createTheme({
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
        opaque: 'shadow-white-heavy',
        solid: 'gray-200',
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
        opaque: 'shadow-black-heavy',
        solid: 'black',
      },
    },
  })
  .addScale('borders', ({ colors }) => ({
    1: `1px solid ${colors.secondary}`,
    2: `2px solid ${colors.secondary}`,
  }))
  .createScaleVariables('elements')
  .build();

export type CoreThemeShape = typeof coreTheme;

export interface CoreTheme extends CoreThemeShape {}
