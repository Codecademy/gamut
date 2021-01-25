import { colors, fontSize, swatches } from '@codecademy/gamut-styles';
import type { HTMLProps } from 'react';

export type ButtonHTMLProps = Omit<
  HTMLProps<HTMLLinkElement> & HTMLProps<HTMLButtonElement>,
  'size'
>;

export type ButtonProps = ButtonHTMLProps & {
  mode?: 'dark' | 'light';
};

export type ButtonSize = 'normal' | 'small';

export type SizedButtonProps = ButtonProps & {
  size?: ButtonSize;
};

export const buttonSizing = (size?: ButtonSize) =>
  size === 'small'
    ? `
      font-size: ${fontSize[14]};
      padding: 0.35rem 0.5rem;
    `
    : `
      font-size: ${fontSize[16]};
      padding: 0.75rem 1rem;
    `;

export const modeColorGroups = {
  dark: {
    background: colors.yellow,
    backgroundDull: colors.yellow[400],
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
