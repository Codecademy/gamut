import { colors } from '@codecademy/gamut-styles/utils/variables';

const selectableColors = Object.keys(colors).reduce(
  (acc, colorKey) => ({
    ...acc,
    [colorKey]: colors[colorKey][500] || colors[colorKey],
  }),
  {}
);

export { selectableColors };
