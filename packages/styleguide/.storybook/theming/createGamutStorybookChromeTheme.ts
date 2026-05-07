import { create } from 'storybook/theming';
import {
  adminTheme,
  coreTheme,
  lxStudioTheme,
  percipioTheme,
  platformTheme,
  coreSwatches,
  trueColors,
} from '@codecademy/gamut-styles/src';

import logo from '../assets/logo.svg';

export const storybookToolbarThemeMap = {
  core: coreTheme,
  admin: adminTheme,
  lxStudio: lxStudioTheme,
  percipio: percipioTheme,
  platform: platformTheme,
} as const;

export type StorybookToolbarThemeKey = keyof typeof storybookToolbarThemeMap;

const DEFAULT_STORYBOOK_TOOLBAR_THEME_KEY: StorybookToolbarThemeKey = 'core';

const isLocalhost = globalThis.location?.toString().includes('localhost');

export function resolveStorybookToolbarThemeKey(
  raw: unknown
): StorybookToolbarThemeKey {
  if (typeof raw === 'string' && raw in storybookToolbarThemeMap) {
    return raw as StorybookToolbarThemeKey;
  }
  return DEFAULT_STORYBOOK_TOOLBAR_THEME_KEY;
}

export function createGamutStorybookChromeTheme(
  themeKey: StorybookToolbarThemeKey | string
) {
  const key = resolveStorybookToolbarThemeKey(themeKey);
  const gamut = storybookToolbarThemeMap[key];

  return create({
    base: 'light',
    brandTitle: isLocalhost ? 'Gamut Local' : 'Gamut',
    brandImage: logo,
    brandUrl: '/',
    fontBase: gamut.fontFamily.base,
    fontCode: gamut.fontFamily.monospace,

    colorPrimary: trueColors.hyper,
    colorSecondary: trueColors.navy,

    appBg: trueColors.white,
    appContentBg: isLocalhost ? trueColors.beige : trueColors.paleBlue,
    appBorderColor: trueColors.navy,
    appBorderRadius: 4,

    textColor: trueColors.navy,
    textInverseColor: trueColors.white,
    textMutedColor: coreSwatches.gray[800],

    barTextColor: coreSwatches.gray[600],
    barSelectedColor: trueColors.navy,
    barBg: trueColors.white,

    inputBg: trueColors.white,
    inputBorder: trueColors.navy,
    inputTextColor: trueColors.navy,
    inputBorderRadius: 2,
  });
}
