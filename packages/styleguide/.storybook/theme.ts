import { create } from '@storybook/theming';
import { theme as gamutTheme } from '@codecademy/gamut-styles/src';
import logo from './assets/logo.svg';

export const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandImage: logo,
  brandUrl: '/',
  fontBase: gamutTheme.fontFamily.base,
});
