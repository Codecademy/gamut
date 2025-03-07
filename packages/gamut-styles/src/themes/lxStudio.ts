import { createTheme } from '@codecademy/variance';

import { lxStudioPalette } from '../variables';
import { coreTheme } from './core';

/**
 * @description This is an extended theme for the lx studio with an expanded set of tokens
 * That are not needed for the rest of the application.
 */

export const lxStudioTheme = createTheme(coreTheme)
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
  })
  .addScale('borderRadii', () => ({
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '999px',
  }))
  .build();

export type LxStudioThemeShape = typeof lxStudioTheme;

export interface LxStudioTheme extends LxStudioThemeShape {}
