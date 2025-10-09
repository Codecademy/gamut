import { createTheme } from '@codecademy/variance';

import {
  borderRadii,
  containerQueries,
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
  breakpoints: { ...mediaQueries, ...containerQueries },
  borderRadii,
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
        success: 'green-0',
        warning: 'yellow-0',
        error: 'red-0',
      },
      shadow: {
        primary: 'navy-800',
        secondary: 'navy-600',
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
      border: {
        primary: 'navy-800',
        secondary: 'navy-600',
        tertiary: 'navy-300',
        disabled: 'navy-500',
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
        error: 'red-300',
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
        success: 'green-900',
        warning: 'yellow-900',
        error: 'red-900',
      },
      shadow: {
        primary: 'white',
        secondary: 'white-600',
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
        _: 'red-300',
        hover: 'red-900',
      },
      interface: {
        _: 'yellow-500',
        hover: 'yellow-400',
      },
      border: {
        primary: 'white',
        secondary: 'white-600',
        tertiary: 'white-300',
        disabled: 'white-500',
      },
    },
  })
  .addScale('borders', ({ colors }: { colors: Record<string, string> }) => ({
    1: `1px solid ${colors['border-primary']}`,
    2: `2px solid ${colors['border-primary']}`,
  }))
  .createScaleVariables('elements')
  .build();

export type CoreThemeShape = typeof coreTheme;

export interface CoreTheme extends CoreThemeShape {}
