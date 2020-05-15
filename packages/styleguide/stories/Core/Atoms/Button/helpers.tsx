import { buttonPresetThemes } from '@codecademy/gamut/src';
export const brandThemeKeys = [
  'brand-red',
  'brand-orange',
  'brand-yellow',
  'brand-purple',
  'brand-pink',
  'brand-mint',
  'brand-beige',
  'brand-dark-blue',
  'brand-blue',
];

export const deprecatedThemeKeys = [
  ...Object.keys(buttonPresetThemes),
  'mint',
  'darkmint',
  'grey',
  'greyblue',
  'white',
  'royalblue',
  'purple',
];

export const statusThemeKeys = [
  'success',
  'notice',
  'error',
  'announcement',
  'info',
];

export const themes = brandThemeKeys.reduce<Record<string, string>>(
  (previous, key) => ({ ...previous, [key]: key }),
  {}
);
