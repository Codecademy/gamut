/* The Gamut styling facade. Consumers import EVERYTHING from here — including
 * `styled` and `css` — never from `@emotion/*` or `styled-system/*` directly.
 * This is the single stable surface a future engine swap rewrites behind. */

/* TIER 1/2 — Panda-native authoring, for Gamut's OWN components. Static,
 * zero-runtime, recipe-driven: `styled(tag, recipe)` and `css({...})` returning
 * class names. This is what src/App.tsx and src/gamut/Button.tsx use. */
export { styled } from 'styled-system/jsx';
export { css } from 'styled-system/css';
export { token } from 'styled-system/tokens';

/* TIER 3/4 — the Emotion-free engine that preserves the EXISTING external API:
 * `styled(Component)(css(...), variant(...), states(...))`. Reuses `variance`
 * untouched, so today's call sites move by changing one import. Exported under
 * `engine` here only because this spike also demonstrates the Panda-native names
 * above; in real Gamut these ARE `styled`/`css`/`variant`/`states`.
 * See src/proof/parity.tsx for the call-site parity proof. */
export * as engine from './engine';
export {
  ThemeProvider,
  extractStyles,
  states,
  system,
  systemProps,
  useNonce,
  useTheme,
  variant,
  type CoreTheme,
  type GamutTheme,
  type StyleFn,
  type StyledComponent,
  type Theme,
} from './engine';

export { Box } from './Box';
export { ButtonBase } from './ButtonBase';
export * from './Button';
// escape hatches that keep the external API compatible under zero-runtime:
export { getColorValue, palette } from './color-values';
export type { SemanticAlias, ThemeName } from './color-values';
export { styledDynamic } from './styledDynamic';
export { ColorMode, type ColorModeName } from './ColorMode';
export { ToolTip, type ToolTipProps } from './ToolTip';
export { Background, useBackground } from './Background';
export { GamutProvider } from './GamutProvider';
