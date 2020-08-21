import { colors } from '@codecademy/gamut-styles';
import { values } from 'lodash';

export const selectableColors = Object.keys(colors).reduce<
  Record<string, string>
>((acc, colorKey) => {
  const colorAtKey = colors[colorKey as keyof typeof colors];

  return {
    ...acc,
    [colorKey]: typeof colorAtKey === 'string' ? colorAtKey : colorAtKey[500],
  };
}, {});

export const presetColors = values(selectableColors);

export const defaultColor = selectableColors.black;
