import { deprecatedColors as colorSwatch } from './deprecated-colors';
import { pxRem } from '../utilities/pxRem';

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

export const fontColor = {
  base: colorSwatch.gray[800],
  heading: colorSwatch.gray[900],
  link: colorSwatch.blue[500],
  linkHover: colorSwatch.blue[700],
};

export const fontDecoration = {
  link: 'none',
  linkHover: 'underline',
} as const;

export const fontSize = {
  xxs: pxRem(14),
  xs: pxRem(16),
  sm: pxRem(18),
  md: pxRem(20),
  lg: pxRem(31),
  xl: pxRem(39),
  xxl: pxRem(49),
  xxxl: pxRem(64),
} as const;

export const lineHeight = {
  text: 1.5,
  heading: 1.1,
} as const;

export const fontWeight = {
  text: 400,
  heading: 700,
} as const;
