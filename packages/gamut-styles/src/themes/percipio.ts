import { createTheme } from '@codecademy/variance';

import { percipioFontFamily, percipioPalette } from '../variables';
import { coreTheme } from './core';

/**
 * @description This is an extended theme for Percipio with custom color tokens
 * based on the Percipio design system specifications.
 */

export const percipioTheme = createTheme({
  ...coreTheme,
  fontFamily: percipioFontFamily,
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
        error: 'percipioFeedbackError',
        success: 'percipioFeedbackSuccess',
        warning: 'percipioFeedbackWarning',
      },
      background: {
        _: 'percipioBgDefault',
        contrast: 'percipioBgContrast',
        current: 'percipioBgDefault',
        primary: 'percipioBgPrimary',
        selected: 'percipioBgSelected',
        disabled: 'percipioBgDisabled',
        hover: 'percipioBgHover',
        success: 'percipioBgSuccess',
        warning: 'percipioBgWarning',
        error: 'percipioBgError',
      },
      shadow: {
        primary: 'percipioShadowPrimary',
        secondary: 'percipioShadowSecondary',
      },
      primary: {
        _: 'percipioActionPrimary',
        hover: 'percipioActionPrimaryHover',
        inverse: 'percipioActionPrimaryInverse',
      },
      secondary: {
        _: 'percipioActionSecondary',
        hover: 'percipioActionSecondaryHover',
      },
      danger: {
        _: 'percipioActionDanger',
        hover: 'percipioActionDangerHover',
      },
      interface: {
        _: 'percipioActionPrimary',
        hover: 'percipioActionPrimaryHover',
      },
      border: {
        primary: 'percipioBorderPrimary',
        secondary: 'percipioBorderSecondary',
        tertiary: 'percipioBorderTertiary',
        disabled: 'percipioBorderDisabled',
      },
    },
  })
  .build();

export type PercipioThemeShape = typeof percipioTheme;

export interface PercipioTheme extends PercipioThemeShape {}
