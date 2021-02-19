import * as tokens from './variables';

export const theme = {
  boxShadows: tokens.boxShadows,
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  colors: tokens.colors,
  spacing: tokens.spacing,
  gutter: {
    8: tokens.spacing[8],
    16: tokens.spacing[16],
    24: tokens.spacing[24],
    32: tokens.spacing[32],
  },
  grid: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
  },
} as const;

export type ThemeShape = typeof theme;

export interface Theme extends ThemeShape {}
