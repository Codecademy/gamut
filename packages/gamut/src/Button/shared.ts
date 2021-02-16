import {
  colors,
  fontSize,
  pxRem,
  spacing,
  swatches,
} from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import type { HTMLProps } from 'react';

export type ButtonProps = Omit<
  HTMLProps<HTMLLinkElement> & HTMLProps<HTMLButtonElement>,
  'size'
> & {
  mode?: 'dark' | 'light';
};

export type ButtonSizeProps = {
  size?: 'normal' | 'small';
};

export type SizedButtonProps = ButtonProps & ButtonSizeProps;

export const SIZE_UNITS = {
  small: { height: 30, fSize: 14, border: 2 },
  normal: { height: 40, fSize: 16, border: 2 },
} as const;

export const buttonSizing = ({ size }: ButtonSizeProps) => {
  if (!size) return;

  const { height, fSize, border } = SIZE_UNITS[size];
  const vPadding = pxRem((height - border * 2 - fSize) / 2);
  const hPadding = size === 'normal' ? spacing[16] : spacing[8];

  return css`
    line-height: 1;
    border: ${border}px solid transparent;
    font-size: ${fontSize[fSize]};
    padding: ${vPadding} ${hPadding};
  `;
};

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
  'dark-alt': {
    background: colors.white,
    backgroundDull: swatches.gray[200],
    backgroundEmphasized: colors.navy,
    backgroundMuted: swatches.gray[600],
    foregroundMuted: swatches.gray[200],
    foreground: colors.navy,
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
  'light-alt': {
    background: colors.navy,
    backgroundDull: swatches.gray[600],
    backgroundEmphasized: swatches.gray[100],
    backgroundMuted: swatches.gray[200],
    foregroundMuted: swatches.gray[600],
    foreground: colors.white,
    shadow: colors.navy,
  },
};
