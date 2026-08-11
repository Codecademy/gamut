/* The single source of truth for this spike: Gamut's REAL prop config and REAL
 * Core theme, imported from the workspace packages rather than retyped.
 *
 * `@codecademy/gamut-styles/dist/variance/config` is the same module that
 * `variance.createCss(PROPERTIES.all)` is built from in
 * `gamut-styles/src/variance/props.ts`, so the prop names, CSS properties and
 * token scales here are exactly what consumers author against today. If Gamut
 * adds a prop, this spike picks it up on the next run.
 */
/* Explicit `.js` extensions: Panda bundles this file with esbuild, which resolves
 * extensionless specifiers, but the verify/manifest scripts run under plain Node
 * ESM, which does not. */
import { all as GAMUT_PROPS } from '@codecademy/gamut-styles/dist/variance/config.js';
import { css as gamutCss } from '@codecademy/gamut-styles/dist/variance/props.js';
import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core.js';

export { GAMUT_PROPS, coreTheme, gamutCss };

/* A prop is part of the CLOSED set iff it declares a token `scale`. Those are the
 * only ones whose complete value space is knowable at build time, so they are the
 * only ones that can be prebuilt. The other 79 are the injector's job.
 * (Counts: 47 closed / 79 open — see runtime-vs-convenience.md.) */
export const closedProps = Object.entries(GAMUT_PROPS)
  .filter(([, config]) => config && config.scale)
  .map(([prop, config]) => ({ prop, ...config }));

/* Gamut's theme scale name → the Panda token category it maps onto. Panda keys
 * tokens by category, and the names differ from Gamut's (`borderRadii` vs
 * `radii`, `fontSize` vs `fontSizes`). */
export const SCALE_TO_PANDA_CATEGORY = {
  colors: 'colors',
  spacing: 'spacing',
  borderRadii: 'radii',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  fontFamily: 'fonts',
  borders: 'borders',
};

/* Gamut stores breakpoints as complete media-query strings; Panda wants bare
 * widths and builds the query itself. Derive rather than hardcode so the two
 * can't drift.
 *
 * Gamut also ships SIX container-query breakpoints (`c_base`…`c_xl`) alongside
 * the five viewport ones. This spike generates the viewport set and reports the
 * container set as a matrix multiplier — see the README; implementing both is
 * more scope than the question needs. */
const MIN_WIDTH = /min-width:\s*([\d.]+px)/;

export const viewportBreakpoints = Object.fromEntries(
  Object.entries(coreTheme.breakpoints)
    .filter(([key]) => !key.startsWith('c_'))
    .map(([key, query]) => {
      const match = MIN_WIDTH.exec(query);
      if (!match) throw new Error(`no min-width in breakpoint ${key}: ${query}`);
      return [key, match[1]];
    })
);

export const containerBreakpointCount = Object.keys(coreTheme.breakpoints).filter(
  (key) => key.startsWith('c_')
).length;

/** Gamut's own base-breakpoint key. Panda's equivalent is `base`; consumers never
 *  see Panda's, because the manifest is keyed on this one. */
export const GAMUT_BASE_KEY = '_';

/** Token values for a Gamut scale, straight off the real theme. */
export const scaleValues = (scale) => {
  const values = coreTheme[scale];
  if (!values) throw new Error(`Core theme has no scale '${scale}'`);
  return values;
};
