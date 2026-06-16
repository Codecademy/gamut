import { createTheme } from '@codecademy/variance';

import {
  fontWeightMediumTitle,
  percipioFontFamily,
  percipioPalette,
} from '../variables';
import { coreTheme } from './core';

export const percipioTheme = createTheme({
  ...coreTheme,
  fontFamily: percipioFontFamily,
  fontWeight: fontWeightMediumTitle,
})
  .addColors(percipioPalette)
  .addColorModes('light', {
    // these are just the overrides, the rest of the tokens are inherited from coreTheme
    light: {
      text: {
        _: 'percipioTextPrimary',
        accent: 'percipioTextAccent',
        disabled: 'percipioTextDisabled',
        secondary: 'percipioTextSecondary',
      },
      feedback: {
        error: 'percipioDanger',
        success: 'percipioFeedbackSuccess',
        warning: 'percipioFeedbackWarning',
      },
      background: {
        primary: 'percipioBgPrimary',
        success: 'percipioBgSuccess',
        warning: 'percipioBgWarning',
        error: 'percipioBgError',
      },
      shadow: {
        primary: 'navy-200',
        secondary: 'navy-400',
      },
      primary: {
        _: 'sapphire',
        hover: 'percipioActionPrimaryHover',
        inverse: 'white',
      },
      secondary: {
        _: 'percipioActionSecondary',
        hover: 'percipioActionSecondaryHover',
      },
      danger: {
        _: 'percipioDanger',
        hover: 'percipioActionDangerHover',
      },
      interface: {
        _: 'sapphire',
        hover: 'percipioActionPrimaryHover',
      },
      border: {
        primary: 'navy-400',
        secondary: 'navy-600',
        tertiary: 'navy-800',
        disabled: 'navy-300',
      },
    },
  })
  .addName('percipio')
  .build();

export type PercipioThemeShape = typeof percipioTheme;

export interface PercipioTheme extends PercipioThemeShape {}
