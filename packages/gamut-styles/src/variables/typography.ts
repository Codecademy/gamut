import { swatches as colorSwatch } from './colors';
import { pxRem } from '../utilities/pxRem';
import { base } from './base';

export const fontBase = `"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif`;

export const fontHeadings = `"Suisse", "Apercu", -apple-system, BlinkMacSystemFont,
"Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif`;

export const fontMonospace = `Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas,
monospace`;

export const fontSystem = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu",
"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`;

export const fontApercu = `"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif`;

export const fontSuisse = `"Suisse", "Apercu", -apple-system, BlinkMacSystemFont,
"Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
"Helvetica Neue", sans-serif`;

export const fontFamily = {
  apercu: fontApercu,
  base: fontBase,
  heading: fontHeadings,
  monospace: fontMonospace,
  suisse: fontSuisse,
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
  text: {
    lg: pxRem(base * 1.125),
    md: pxRem(base),
    sm: pxRem(base * 0.85),
  },
  heading: {
    xxl: pxRem(base * 3),
    xl: pxRem(base * 2.2),
    lg: pxRem(base * 1.6),
    md: pxRem(base * 1.4),
    sm: pxRem(base * 1.25),
    xs: pxRem(base),
  },
};

export const lineHeight = {
  text: 1.5,
  heading: 1.1,
};

export const fontWeight = {
  text: 400,
  heading: 700,
};
