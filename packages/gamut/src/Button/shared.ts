import { colors, swatches, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import type { HTMLProps } from 'react';

export type ButtonHTMLProps = Omit<
  HTMLProps<HTMLLinkElement> & HTMLProps<HTMLButtonElement>,
  'size'
>;

export type ButtonProps = ButtonHTMLProps & {
  mode?: 'dark' | 'light';
};

export type ButtonSize = 'normal' | 'small';

export type SizedButtonProps = ButtonProps &
  HandlerProps<typeof sizedButtonVariants>;

export const sizedButtonVariants = variant<'size', ButtonSize>({
  prop: 'size',
  variants: {
    small: {
      fontSize: 14,
      paddingY: 4,
      paddingX: 8,
    },
    normal: {
      fontSize: 16,
      paddingY: 12,
      paddingX: 16,
    },
  },
});

export const modeColorGroups = {
  dark: {
    background: colors.white,
    backgroundDull: colors['gray-400'],
    backgroundEmphasized: swatches.gray[900],
    backgroundMuted: swatches.gray[600],
    foregroundMuted: swatches.gray[200],
    foreground: colors.black,
    shadow: colors.white,
  },
  light: {
    background: colors.hyper,
    backgroundDull: swatches.hyper[400],
    backgroundEmphasized: swatches.gray[100],
    backgroundMuted: swatches.gray[200],
    foregroundMuted: swatches.gray[600],
    foreground: colors.white,
    shadow: colors.black,
  },
};
