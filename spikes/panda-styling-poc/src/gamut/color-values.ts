import {
  type ColorMode,
  type SemanticAlias,
  type ThemeName,
  palette,
  semanticColors,
} from '../tokens.source';

/* ESCAPE HATCH #1 — read a resolved color VALUE in JS.
 *
 * Under a zero-runtime engine, a semantic token resolves to `var(--colors-…)`,
 * so JS can't read a hex from it. Anything feeding a color to a NON-CSS consumer
 * (charts like @nivo, canvas, third-party inline styles) needs the literal value.
 * This is the analog of gamut's `_getColorValue` / `useColorModes()[3]` and the
 * hand-rolled raw-hex workaround platform already uses in `contentTypeIcon.ts`.
 *
 * Because it derives from the same `tokens.source` that builds the Panda CSS
 * variables, it can't drift from what the browser renders. */
export const getColorValue = (
  alias: SemanticAlias,
  mode: ColorMode = 'light',
  theme: ThemeName = 'core'
): string => palette[semanticColors[theme][mode][alias]];

// raw palette passthrough for the rare "I need a specific swatch" case
export { palette } from '../tokens.source';
export type { ColorMode, SemanticAlias, ThemeName } from '../tokens.source';
