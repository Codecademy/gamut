import { createThemeVariables } from './utilities';
import * as tokens from './variables';

export const baseTheme = {
  boxShadows: tokens.boxShadows,
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  colors: tokens.colors,
  spacing: tokens.spacing,
  timing: tokens.timing,
  borders: tokens.borders,
  header: tokens.header,
  contentWidth: tokens.contentWidth,
} as const;

export const {
  theme,
  cssVariables: themeCssVariables,
} = createThemeVariables(baseTheme, ['header', 'contentWidth']);
