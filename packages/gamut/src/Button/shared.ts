import { styledConfig, system, theme } from '@codecademy/gamut-styles';

const { colors } = theme;

export const modeColorGroups = {
  dark: {
    primary: {
      background: colors.yellow,
      backgroundDull: colors['yellow-400'],
      backgroundEmphasized: colors['blue-800'],
      backgroundMuted: colors['gray-600'],
      foregroundMuted: colors['gray-200'],
      foreground: colors.black,
      shadow: colors.white,
    },
    secondary: {
      background: colors.white,
      backgroundDull: colors['gray-200'],
      backgroundEmphasized: colors['blue-800'],
      backgroundMuted: colors['gray-600'],
      foregroundMuted: colors['gray-200'],
      foreground: colors.navy,
      shadow: colors['gray-200'],
    },
  },
  light: {
    primary: {
      background: colors.hyper,
      backgroundDull: colors['hyper-400'],
      backgroundEmphasized: colors['gray-100'],
      backgroundMuted: colors['gray-200'],
      foregroundMuted: colors['gray-600'],
      foreground: colors.white,
      shadow: colors.navy,
    },
    secondary: {
      background: colors.navy,
      backgroundDull: colors['gray-600'],
      backgroundEmphasized: colors['gray-100'],
      backgroundMuted: colors['gray-200'],
      foregroundMuted: colors['gray-600'],
      foreground: colors.white,
      shadow: colors.black,
    },
  },
};

export const config = styledConfig(['size']);

export const buttonSizing = system.variant({
  prop: 'size',
  defaultVariant: 'normal',
  variants: {
    normal: {
      fontSize: 16,
      height: 40,
      minWidth: 40,
      py: 4,
      px: 16,
    },
    small: {
      fontSize: 14,
      height: 32,
      minWidth: 32,
      py: 4,
      px: 8,
    },
  },
});
