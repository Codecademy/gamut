import { colors, swatches } from '@codecademy/gamut-styles';

import { VisualTheme } from '../theming/VisualTheme';

export type ButtonProps = {
  mode?: VisualTheme;
};

export const modeColorGroups = {
  [VisualTheme.DarkMode]: {
    background: colors.yellow,
    backgroundEmphasized: swatches.gray[900],
    backgroundMuted: swatches.gray[600],
    foregroundMuted: swatches.gray[200],
    foreground: colors.black,
    shadow: colors.white,
  },
  [VisualTheme.LightMode]: {
    background: colors.hyper,
    backgroundEmphasized: swatches.gray[100],
    backgroundMuted: swatches.gray[200],
    foregroundMuted: swatches.gray[600],
    foreground: colors.white,
    shadow: colors.black,
  },
};
