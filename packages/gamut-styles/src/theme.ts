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
  header: tokens.header,
  content: tokens.contentWidth,
  borders: tokens.borders,
} as const;

export const {
  theme,
  cssVariables: themeCssVariables,
} = createThemeVariables(baseTheme, ['header', 'content']);
