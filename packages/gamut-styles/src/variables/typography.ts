import { deprecatedColors as colorSwatch } from './deprecated-colors';
import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const fontAccent = `"Suisse", "Apercu", -apple-system, BlinkMacSystemFont,
"Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
"Helvetica Neue", sans-serif`;

export const fontBase = `"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif`;

export const fontMonospace = `Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas,
monospace`;

export const fontSystem = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu",
"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`;

export const fontFamily = {
  accent: fontAccent,
  base: fontBase,
  monospace: fontMonospace,
  system: fontSystem,
} as const;

export type FontFamilies = keyof typeof fontFamily;

export const fontColor = {
  base: colorSwatch.gray[800],
  heading: colorSwatch.gray[900],
  link: colorSwatch.blue[500],
  linkHover: colorSwatch.blue[700],
} as const;

export type FontColors = keyof typeof fontColor;

export const fontDecorations = {
  link: 'none',
  linkHover: 'underline',
} as const;

export type FontDecorations = keyof typeof fontDecorations;

export const fontScale = {
  1: pxRem(0.85 * base),
  2: pxRem(1 * base),
  3: pxRem(1.125 * base),
  4: pxRem(1.25 * base),
  5: pxRem(1.4 * base),
  6: pxRem(1.6 * base),
  7: pxRem(2.2 * base),
  8: pxRem(3 * base),
} as const;

export type FontScale = keyof typeof fontScale;

export const fontSize = {
  text: {
    lg: fontScale[3],
    md: fontScale[2],
    sm: fontScale[1],
  },
  heading: {
    xxl: fontScale[8],
    xl: fontScale[7],
    lg: fontScale[6],
    md: fontScale[5],
    sm: fontScale[4],
    xs: fontScale[2],
  },
} as const;

export type FontSizes = keyof typeof fontSize;

export const lineHeight = {
  '1.5': 1.5,
  '1.1': 1.1,
} as const;

export type LineHeights = keyof typeof lineHeight;

export const fontWeight = {
  light: 300,
  normal: 400,
  bold: 700,
} as const;

export type FontWeights = keyof typeof fontWeight;
