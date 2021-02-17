import { colors, pxRem, swatches } from '@codecademy/gamut-styles';
import { css, Theme } from '@emotion/react';
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
  small: { height: 32, fSize: 14, border: 2 },
  normal: { height: 42, fSize: 16, border: 2 },
} as const;

export const buttonSizing = ({
  size,
  theme,
}: ButtonSizeProps & { theme: Theme }) => {
  if (!size) return;

  const { height, fSize, border } = SIZE_UNITS[size];
  const childElementOffset = size === 'normal' ? '-1px' : '0';
  const hPadding = size === 'normal' ? theme.spacing[16] : theme.spacing[8];
  const fontSize = theme.fontSize[fSize];

  return css`
    border: ${border}px solid transparent;
    vertical-align: middle;
    display: inline-block;
    padding: ${theme.spacing[4]} ${hPadding};
    font-size: ${fontSize};
    height: ${pxRem(height)};

    &:before,
    &:after {
      margin-left: -1px;
      width: 1px;
      content: '';
      height: calc(${pxRem(height - border * 2)} - ${theme.spacing[8]});
      display: inline-block;
      vertical-align: middle;
    }

    > * {
      display: inline-block;
      vertical-align: middle;

      &:first-child {
        margin-left: ${childElementOffset};
      }
      &:last-child {
        margin-right: ${childElementOffset};
      }
    }
  `;
};

export const modeColorGroups = {
  dark: {
    background: colors.yellow,
    backgroundDull: swatches.yellow[400],
    backgroundEmphasized: swatches.blue[800],
    backgroundMuted: swatches.gray[600],
    foregroundMuted: swatches.gray[200],
    foreground: colors.black,
    shadow: colors.white,
  },
  'dark-alt': {
    background: colors.white,
    backgroundDull: swatches.gray[200],
    backgroundEmphasized: swatches.blue[800],
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
