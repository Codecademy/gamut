import { colors } from '@codecademy/gamut-styles';

import { VisualTheme } from '../theming/VisualTheme';

export type ButtonProps = {
  mode?: VisualTheme;
};

export const modeColorGroups = {
  dark: {
    background: colors.yellow,
    foreground: colors.black,
  },
  light: {
    background: colors.hyper,
    foreground: colors.white,
  },
};
