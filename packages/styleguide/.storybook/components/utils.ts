import { colors } from '@codecademy/gamut-styles';

export const selectableColors = Object.keys(colors).reduce<
  Record<string, string>
>((acc, colorKey) => {
  const colorAtKey = colors[colorKey as keyof typeof colors];

  return {
    ...acc,
    [colorKey]: colorAtKey,
  };
}, {});

export const selectableColorNames = Object.keys(colors).reduce<
  Record<string, string>
>((acc, colorKey) => {
  return {
    ...acc,
    [colorKey]: colorKey,
  };
}, {});
