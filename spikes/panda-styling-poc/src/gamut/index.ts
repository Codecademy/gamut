/* The Gamut styling facade. Consumers import EVERYTHING from here — including
 * `styled` and `css` — never from `@emotion/*` or `styled-system/*` directly.
 * This is the single stable surface a future engine swap rewrites behind. */
export { styled } from 'styled-system/jsx';
export { css } from 'styled-system/css';

export { Box } from './Box';
export { Button } from './Button';
export { ColorMode, type ColorModeName } from './ColorMode';
export { Background, useBackground } from './Background';
export { GamutProvider } from './GamutProvider';
