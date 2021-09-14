import { create } from '@storybook/theming';
import { theme as gamutTheme, colors } from '@codecademy/gamut-styles/src';
import logo from './assets/logo.svg';

const isLocalhost = globalThis.location?.toString().includes('localhost');

export const theme = create({
  base: 'light',
  brandTitle: isLocalhost ? 'Gamut Local' : 'Gamut',
  brandImage: logo,
  brandUrl: '/',
  fontBase: gamutTheme.fontFamily.base,

  colorPrimary: colors.hyper,
  colorSecondary: colors.navy,

  // UI
  appBg: isLocalhost ? colors['paleBlue'] : colors.white,
  appContentBg: colors.white,
  appBorderColor: colors.navy,
  appBorderRadius: 4,

  // Text colors
  textColor: colors.navy,
  textInverseColor: colors.white,
  textMutedColor: colors['gray-800'],

  // Toolbar default and active colors
  barTextColor: colors['gray-600'],
  barSelectedColor: colors.navy,
  barBg: colors.white,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.navy,
  inputTextColor: colors.navy,
  inputBorderRadius: 2,
});
