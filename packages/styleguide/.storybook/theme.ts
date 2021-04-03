import { create } from '@storybook/theming';
import { theme as gamutTheme } from '@codecademy/gamut-styles';
import logo from './assets/logo.svg';

export const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandImage: logo,
  brandUrl: '/',
  fontBase: gamutTheme.fontFamily.base,

  colorPrimary: gamutTheme.colors.hyper,
  colorSecondary: gamutTheme.colors.navy,

  // UI
  appBg: gamutTheme.colors.white,
  appContentBg: gamutTheme.colors.white,
  appBorderColor: gamutTheme.colors.navy,
  appBorderRadius: 4,

  // Text colors
  textColor: gamutTheme.colors.navy,
  textInverseColor: gamutTheme.colors.white,

  // Toolbar default and active colors
  barTextColor: gamutTheme.colors['gray-600'],
  barSelectedColor: gamutTheme.colors.navy,
  barBg: gamutTheme.colors.white,

  // Form colors
  inputBg: gamutTheme.colors.white,
  inputBorder: gamutTheme.colors.navy,
  inputTextColor: gamutTheme.colors.navy,
  inputBorderRadius: 2,
});
