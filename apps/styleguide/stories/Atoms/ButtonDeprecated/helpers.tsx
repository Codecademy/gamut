import { buttonPresetThemes } from '@codecademy/gamut';

export const newThemeKeys = ['hyper', 'navy', 'red', 'white'];

export const brandThemeKeys = [
  'brand-red',
  'brand-yellow',
  'brand-purple',
  'brand-dark-blue',
  'brand-blue',
];

export const deprecatedThemeKeys = [
  ...Object.keys(buttonPresetThemes),
  'mint',
  'darkmint',
  'grey',
  'greyblue',
  'royalblue',
];

export const themes = brandThemeKeys.reduce<Record<string, string>>(
  (previous, key) => ({ ...previous, [key]: key }),
  {}
);
