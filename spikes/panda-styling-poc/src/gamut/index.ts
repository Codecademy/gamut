/* The Gamut styling facade. Consumers import EVERYTHING from here — including
 * `styled` and `css` — never from `@emotion/*` or `styled-system/*` directly.
 * This is the single stable surface a future engine swap rewrites behind. */
export { styled } from 'styled-system/jsx';
export { css } from 'styled-system/css';
export { token } from 'styled-system/tokens';

export { Box } from './Box';
export { Button } from './Button';
// escape hatches that keep the external API compatible under zero-runtime:
export { getColorValue, palette } from './color-values';
export type { SemanticAlias, ThemeName } from './color-values';
export { styledDynamic } from './styledDynamic';
export { ColorMode, type ColorModeName } from './ColorMode';
export { Background, useBackground } from './Background';
export { GamutProvider } from './GamutProvider';
