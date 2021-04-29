import {
  colors,
  styledConfig,
  swatches,
  system,
  theme,
} from '@codecademy/gamut-styles';
import { serializeTokens } from '@codecademy/variance';
import { css, CSSObject, Theme, useTheme } from '@emotion/react';

import { buttonColors, ButtonOutline } from './ButtonOutline';

export const modeColorGroups = {
  dark: {
    primary: {
      background: colors.yellow,
      backgroundDull: swatches.yellow[400],
      backgroundEmphasized: swatches.blue[800],
      backgroundMuted: swatches.gray[600],
      foregroundMuted: swatches.gray[200],
      foreground: colors.black,
      shadow: colors.white,
    },
    secondary: {
      background: colors.white,
      backgroundDull: swatches.gray[200],
      backgroundEmphasized: swatches.blue[800],
      backgroundMuted: swatches.gray[600],
      foregroundMuted: swatches.gray[200],
      foreground: colors.navy,
      shadow: colors['gray-200'],
    },
  },
  light: {
    primary: {
      background: colors.hyper,
      backgroundDull: swatches.hyper[400],
      backgroundEmphasized: swatches.gray[100],
      backgroundMuted: swatches.gray[200],
      foregroundMuted: swatches.gray[600],
      foreground: colors.white,
      shadow: colors.navy,
    },
    secondary: {
      background: colors.navy,
      backgroundDull: swatches.gray[600],
      backgroundEmphasized: swatches.gray[100],
      backgroundMuted: swatches.gray[200],
      foregroundMuted: swatches.gray[600],
      foreground: colors.white,
      shadow: colors.black,
    },
  },
};

export const config = styledConfig(['mode', 'variant', 'size']);

export function useColorMode(mode?: keyof Theme['colorModes']['modes']) {
  const theme = useTheme();

  // This is a defense against theme being undefined in specific tests and should not come into play for actual code
  const { active = 'light' } = theme?.colorModes || {};
  return mode ?? active;
}

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
