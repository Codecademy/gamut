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
      text: {
        _: 'navy-800',
        accent: 'navy-900',
        disabled: 'navy-500',
        secondary: 'navy-600',
      },
      feedback: {
        error: 'red-600',
        success: 'green-700',
        warning: 'yellow',
      },
      background: {
        _: 'white',
        contrast: 'white',
        current: 'white',
        primary: 'beige',
        selected: 'navy-100',
        disabled: 'navy-200',
        hover: 'navy-200',
      },
      shadow: {
        opaque: 'shadow-white-heavy',
        solid: 'gray-200',
      },
      primary: {
        _: 'hyper-500',
        hover: 'hyper-400',
        inverse: 'yellow-500',
      },
      secondary: {
        _: 'navy-800',
        hover: 'navy-700',
      },
      danger: {
        _: 'red-500',
        hover: 'red-600',
      },
      interface: {
        _: 'hyper-500',
        hover: 'hyper-400',
      },
    },
    dark: {
      text: {
        _: 'white',
        accent: 'beige',
        disabled: 'white-500',
        secondary: 'white-600',
      },
      feedback: {
        error: 'red-0',
        success: 'green-400',
        warning: 'yellow-0',
      },
      background: {
        _: 'navy-800',
        contrast: 'black',
        current: 'navy-800',
        primary: 'navy-900',
        selected: 'white-100',
        disabled: 'white-200',
        hover: 'white-200',
      },
      shadow: {
        opaque: 'shadow-black-heavy',
        solid: 'black',
      },
      primary: {
        _: 'yellow-500',
        hover: 'yellow-400',
        inverse: 'hyper-500',
      },
      secondary: {
        _: 'white',
        hover: 'white-700',
      },
      danger: {
        _: 'red-0',
        hover: 'red-100',
      },
      interface: {
        _: 'yellow-500',
        hover: 'yellow-400',
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
