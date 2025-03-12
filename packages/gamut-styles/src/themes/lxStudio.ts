import { createTheme } from '@codecademy/variance';

import {
  fontBase,
  fontMonospace,
  fontSystem,
  lxStudioPalette,
} from '../variables';
import { coreTheme } from './core';

/**
 * @description This is an extended theme for the lx studio with an expanded set of tokens
 * That are not needed for the rest of the application.
 */

const lxStudioFontFamily = {
  accent: fontBase,
  base: fontBase,
  monospace: fontMonospace,
  system: fontSystem,
} as const;

export const lxStudioBorderRadii = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '999px',
};

export const lxStudioTheme = createTheme({
  ...coreTheme,
  borderRadii: lxStudioBorderRadii,
  fontFamily: lxStudioFontFamily,
})
  .addColors(lxStudioPalette)
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
        success: 'lxStudioSuccess',
        warning: 'yellow',
      },
      background: {
        _: 'white',
        contrast: 'white',
        current: 'white',
        primary: 'lxStudioBgPrimary',
        selected: 'navy-100',
        disabled: 'navy-200',
        hover: 'navy-200',
      },
      shadow: {
        primary: 'navy-200',
        secondary: 'navy-600',
      },
      primary: {
        _: 'lxStudioPurple',
        hover: 'lxStudioPurpleHover',
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
        primary: 'navy-400',
        secondary: 'navy-600',
        tertiary: 'navy-800',
        disabled: 'navy-300',
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
        _: 'red-0',
        hover: 'red-100',
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
  .build();

export type LxStudioThemeShape = typeof lxStudioTheme;

export interface LxStudioTheme extends LxStudioThemeShape {}
