import { theme as gamutTheme } from '@codecademy/gamut-styles';
import { create } from '@storybook/theming';
import logo from './assets/gamut-logo.svg';

export const theme = create(
  {
    base: 'light',
    brandTitle: 'Gamut',
    brandImage: logo,
    brandUrl: '/',

    // Colors
    appBg: gamutTheme.colors.white,

    //Text
    textColor: gamutTheme.colors.navy,

    fontBase: gamutTheme.fontFamily.base,
  },
  {
    random: { 1: 2 },
  }
);

console.log(theme);
