import { deprecatedGamutColors } from '@codecademy/gamut-styles/utils/variables';

function convertCamelToSpinel(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// remapping of gamut base colors that can be placed directly into the `select` knob function
const selectableGamutColors = {};

// eslint-disable-next-line guard-for-in
for (const color in deprecatedGamutColors.base) {
  selectableGamutColors[
    deprecatedGamutColors.base[color]
  ] = `gamut-${convertCamelToSpinel(color)}`;
}

export { selectableGamutColors };
