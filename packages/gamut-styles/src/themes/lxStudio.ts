import { createTheme } from '@codecademy/variance';

import {
  fontMonospace,
  fontSystem,
  fontWeightMediumTitle,
  lxStudioPalette,
  percipioFontFamily,
} from '../variables';
import { coreTheme } from './core';

/**
 * @description This is an extended theme for the lx studio with an expanded set of tokens
 * That are not needed for the rest of the application.
 */

const lxStudioFontFamily = {
  accent: percipioFontFamily.accent,
  base: percipioFontFamily.base,
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
  fontWeight: fontWeightMediumTitle,
})
  .addColors(lxStudioPalette)
  .addColorModes('light', {
    // these are just the overrides, the rest of the tokens are inherited from coreTheme
    light: {
      feedback: {
        success: 'lxStudioSuccess',
      },
      background: {
        primary: 'lxStudioBgPrimary',
      },
      shadow: {
        primary: 'navy-200',
      },
      primary: {
        _: 'sapphire',
        hover: 'navy-800',
      },
      interface: {
        _: 'hyper-500',
        hover: 'hyper-400',
      },
      border: {
        primary: 'navy-400',
        tertiary: 'navy-800',
        disabled: 'navy-300',
      },
    },
  })
  .addName('lxStudio')
  .build();

export type LxStudioThemeShape = typeof lxStudioTheme;

export type LxStudioTheme = LxStudioThemeShape;
