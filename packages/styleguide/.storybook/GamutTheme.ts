import { create } from '@storybook/theming';
import {
  theme as gamutTheme,
  trueColors,
  coreSwatches,
} from '@codecademy/gamut-styles/src';

import logo from './assets/logo.svg';

const isLocalhost = globalThis.location?.toString().includes('localhost');

export default create({
  base: 'light',
  brandTitle: isLocalhost ? 'Gamut Local' : 'Gamut',
  brandImage: logo,
  brandUrl: '/',
  fontBase: gamutTheme.fontFamily.base,

  //
  colorPrimary: trueColors.hyper,
  colorSecondary: trueColors.navy,

  // UI
  appBg: trueColors.white,
  appContentBg: isLocalhost ? trueColors.beige : trueColors.paleBlue,
  appBorderColor: trueColors.navy,
  appBorderRadius: 4,

  // Text colors
  textColor: trueColors.navy,
  textInverseColor: trueColors.white,
  textMutedColor: coreSwatches.gray[800],

  // Toolbar default and active colors
  barTextColor: coreSwatches.gray[600],
  barSelectedColor: trueColors.navy,
  barBg: trueColors.white,

  // Form colors
  inputBg: trueColors.white,
  inputBorder: trueColors.navy,
  inputTextColor: trueColors.navy,
  inputBorderRadius: 2,
});
