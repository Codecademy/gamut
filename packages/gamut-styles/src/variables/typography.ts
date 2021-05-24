import { pxRem } from '../styles/pxRem';

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

export const fontSize = {
  64: pxRem(64),
  44: pxRem(44),
  34: pxRem(34),
  26: pxRem(26),
  22: pxRem(22),
  20: pxRem(20),
  18: pxRem(18),
  16: pxRem(16),
  14: pxRem(14),
} as const;

export const lineHeight = {
  base: 1.5,
  title: 1.1,
} as const;

export const fontWeight = {
  base: 400,
  title: 700,
  700: 700,
  400: 400,
} as const;
