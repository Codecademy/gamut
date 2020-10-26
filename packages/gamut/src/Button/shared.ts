import { colors } from '@codecademy/gamut-styles';

import { VisualTheme } from '../theming/VisualTheme';

export type ButtonProps = {
  mode?: VisualTheme;
};

export const modeColorGroups = {
  [VisualTheme.DarkMode]: {
    background: colors.yellow,
    foreground: colors.black,
  },
  [VisualTheme.LightMode]: {
    background: colors.hyper,
    foreground: colors.white,
  },
};
