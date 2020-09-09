import { colors } from './colors';

export const borderWidths = {
  0: '0',
  1: '1px',
  2: '2px',
} as const;

export type BorderWidths = keyof typeof borderWidths;

export const borderRadii = {
  2: '2px',
  4: '4px',
  8: '8px',
};

export type BorderRadii = keyof typeof borderRadii;

export const borderColors = {
  base: colors.navy,
};

export type BorderColors = keyof typeof borderColors;
