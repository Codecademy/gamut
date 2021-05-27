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
      text: 'navy-800',
      primary: 'hyper',
      secondary: 'navy',
      feedback: {
        error: 'red-500',
        success: 'green-700',
        warning: 'yellow',
      },
      background: {
        current: 'white',
        base: 'white',
        primary: 'beige',
        secondary: 'paleYellow',
        tertiary: 'paleGreen',
        quaternary: 'paleBlue',
        quinary: 'palePink',
      },
      shadow: {
        opaque: 'shadow-white-heavy',
        solid: 'gray-200',
      },
      input: {
        interactive: 'hyper',
        error: 'red-500',
        verified: 'green-700',
        placeholder: 'navy-500',
        bg: 'white',
        disabled: {
          text: 'navy-100',
          bg: 'navy-500',
        },
        option: {
          bg: 'white',
          hover: 'navy-100',
          selected: 'navy-200',
        },
      },
      menu: {
        item: {
          bg: 'white',
          hover: 'navy-100',
          selected: 'navy-200',
        },
      },
      button: {
        hover: {
          bg: 'navy-100',
        },
        disabled: {
          text: 'navy-500',
          bg: 'navy-200',
        },
        danger: {
          default: 'red-500',
          hover: 'red-400',
        },
        primary: {
          default: 'hyper',
          hover: 'hyper-400',
        },
        secondary: {
          default: 'navy',
          hover: 'navy-600',
        },
      },
    },
    dark: {
      text: 'white',
      primary: 'yellow',
      secondary: 'white',
      feedback: {
        error: 'red-0',
        success: 'green-400',
        warning: 'yellow',
      },
      background: {
        current: 'navy',
        base: 'navy',
        primary: 'navy-900',
      },
      shadow: {
        opaque: 'shadow-black-heavy',
        solid: 'black',
      },
      input: {
        interactive: 'yellow-500',
        error: 'red-0',
        verified: 'green-400',
        placeholder: 'navy-400',
        bg: 'navy-800',
        disabled: {
          text: 'navy-400',
          bg: 'navy-900',
        },
        option: {
          bg: 'navy-800',
          hover: 'navy-900',
          selected: 'navy-700',
        },
      },
      menu: {
        item: {
          bg: 'navy-800',
          hover: 'navy-900',
          selected: 'navy-700',
        },
      },
      button: {
        hover: {
          bg: 'navy-700',
        },
        disabled: {
          text: 'navy-200',
          bg: 'navy-500',
        },
        danger: {
          default: 'red-0',
          hover: 'red-100',
        },
        primary: {
          default: 'yellow-500',
          hover: 'yellow-400',
        },
        secondary: {
          default: 'white',
          hover: 'gray-200',
        },
      },
    },
  })
  .addScale('borders', ({ colors }) => ({
    1: `1px solid ${colors.secondary}`,
    2: `2px solid ${colors.secondary}`,
  }))
  .addScale('shadows', ({ colors }) => ({
    outline: {
      primary: `0 0 0 2px ${colors['background-current']}, 0 0 0 4px ${colors.primary}`,
      secondary: `0 0 0 2px ${colors['background-current']}, 0 0 0 4px ${colors.secondary}`,
      danger: `0 0 0 2px ${colors['background-current']}, 0 0 0 4px ${colors['feedback-error']}`,
    },
  }))
  .createScaleVariables('elements')
  .build();

export type CoreThemeShape = typeof coreTheme;

export interface CoreTheme extends CoreThemeShape {}
