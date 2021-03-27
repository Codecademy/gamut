import { createThemeVariables } from './utilities';
import * as tokens from './variables';

const themeColors = {
  ...tokens.colors,
  ...tokens.colorModes.light,
};

export interface ColorModes<T extends Record<string, Record<string, string>>> {
  active: keyof T;
  modes: T;
}

const colorModes: ColorModes<typeof tokens['colorModes']> = {
  active: 'light',
  modes: tokens.colorModes,
};

export const baseTheme = {
  boxShadows: tokens.boxShadows,
  breakpoints: tokens.mediaQueries,
  fontSize: tokens.fontSize,
  fontFamily: tokens.fontFamily,
  lineHeight: tokens.lineHeight,
  fontWeight: tokens.fontWeight,
  colors: themeColors,
  spacing: tokens.spacing,
  elements: tokens.elements,
  colorModes,
} as const;

export const {
  theme,
  cssVariables: themeCssVariables,
} = createThemeVariables(baseTheme, ['elements', 'colors']);
