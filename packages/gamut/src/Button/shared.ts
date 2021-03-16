import { colors, swatches, variant } from '@codecademy/gamut-styles';
import type { HTMLProps } from 'react';

export type ButtonProps = Omit<
  HTMLProps<HTMLAnchorElement> & HTMLProps<HTMLButtonElement>,
  'size'
> & {
  mode?: 'dark' | 'light';
  variant?: 'primary' | 'secondary';
};

export type ButtonSizeProps = {
  size?: 'normal' | 'small';
};

export type SizedButtonProps = ButtonProps & ButtonSizeProps;

export const buttonSizing = variant({
  prop: 'size',
  default: 'normal',
  variants: {
    normal: {
      fontSize: 16,
      height: '40px',
      minWidth: '40px',
      paddingY: 4,
      paddingX: 16,
    },
    small: {
      fontSize: 14,
      height: '32px',
      minWidth: '32px',
      paddingY: 4,
      paddingX: 8,
    },
  },
});

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
      shadow: colors.white,
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
      shadow: colors.black,
    },
    secondary: {
      background: colors.navy,
      backgroundDull: swatches.gray[600],
      backgroundEmphasized: swatches.gray[100],
      backgroundMuted: swatches.gray[200],
      foregroundMuted: swatches.gray[600],
      foreground: colors.white,
      shadow: colors.navy,
    },
  },
};
