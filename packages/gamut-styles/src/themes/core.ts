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
      text: { _: 'navy-800', disabled: 'navy-500' },
      feedback: {
        error: 'red-500',
        success: 'green-700',
        warning: 'yellow',
      },
      background: {
        _: 'white',
        current: 'white',
        primary: 'beige',
        selected: 'navy-200',
        disabled: 'navy-200',
        hover: 'navy-100',
      },
      shadow: {
        opaque: 'shadow-white-heavy',
        solid: 'gray-200',
      },
      primary: {
        _: 'hyper-500',
        hover: 'hyper-400',
      },
      secondary: {
        _: 'navy-800',
        hover: 'navy-700',
      },
      danger: {
        _: 'red-500',
        hover: 'red-400',
      },
    },
    dark: {
      text: { _: 'white', disabled: 'navy-200' },
      feedback: {
        error: 'red-0',
        success: 'green-0',
        warning: 'yellow',
      },
      background: {
        _: 'navy-800',
        current: 'navy-800',
        primary: 'navy-900',
        selected: 'navy-700',
        disabled: 'navy-500',
        hover: 'navy-900',
      },
      shadow: {
        opaque: 'shadow-black-heavy',
        solid: 'black',
      },
      primary: {
        _: 'yellow-500',
        hover: 'yellow-400',
      },
      secondary: {
        _: 'white',
        hover: 'navy-200',
      },
      danger: {
        _: 'red-0',
        hover: 'red-100',
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
