import { create } from '@storybook/theming';
import logo from './assets/logo.svg';

export const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandImage: logo,
  brandUrl: '/',
});
