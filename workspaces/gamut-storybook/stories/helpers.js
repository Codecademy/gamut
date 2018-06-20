import { gamutColors } from '@codecademy/gamut-styles/utils/variables';

function convertCamelToSpinel(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// remapping of gamut base colors that can be placed directly into the `select` knob function
const selectableGamutColors = {};

for (const color in gamutColors.base) {
  selectableGamutColors[
    gamutColors.base[color]
  ] = `gamut-${convertCamelToSpinel(color)}`;
}

export { selectableGamutColors };
