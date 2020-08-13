import { create } from '@storybook/theming';
import { fontFamily, colors, brandColors } from '@codecademy/gamut-styles';

export const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandUrl: '/',

  colorPrimary: colors.black,
  colorSecondary: colors.blue[400],

  // UI
  appBg: colors.gray[100],
  appContentBg: colors.white,
  appBorderColor: colors.gray[200],
  appBorderRadius: 4,

  // Typography
  fontBase: fontFamily.base,
  fontCode: 'monospace',

  // Text colors
  textColor: colors.gray[700],
  textInverseColor: colors.white,

  // Toolbar default and active colors
  barTextColor: colors.gray[200],
  barSelectedColor: colors.blue[500],
  barBg: colors.white,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.gray[100],
  inputTextColor: colors.gray[700],
  inputBorderRadius: 6,
});
