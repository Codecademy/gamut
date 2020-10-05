import {
  fontSize,
  fontFamily,
  lineHeight,
  fontWeight,
  mediaQueries,
  spacing,
  colors,
} from './variables';

export const theme = {
  colors,
  breakpoints: mediaQueries,
  fontSize,
  fontFamily,
  lineHeight,
  fontWeight,
  spacing,
} as const;

export type Theme = typeof theme;
