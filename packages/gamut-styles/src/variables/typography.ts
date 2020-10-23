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
};

export const fontColor = {
  base: colorSwatch.gray[800],
  heading: colorSwatch.gray[900],
  link: colorSwatch.blue[500],
  linkHover: colorSwatch.blue[700],
};

export const fontDecoration = {
  link: 'none',
  linkHover: 'underline',
};

export const fontSize = {
  ['t-1']: pxRem(64),
  ['t-2']: pxRem(44),
  ['t-3']: pxRem(34),
  ['t-4']: pxRem(26),
  ['t-5']: pxRem(22),
  ['t-6']: pxRem(20),
  ['p-large']: pxRem(18),
  ['p-base']: pxRem(16),
  ['p-small']: pxRem(14),
};

export const lineHeight = {
  base: 1.5,
  title: 1.1,
};

export const fontWeight = {
  base: 400,
  title: 700,
};
