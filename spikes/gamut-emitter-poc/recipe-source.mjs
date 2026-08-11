/* The recipe tier's inputs: the REAL `variance` implementation of `variant()` /
 * `states()` / `css()`, bound to the REAL Gamut prop config and Core theme.
 *
 * Not the spike engine's copy on `cass-GMT-1715` — the actual
 * `packages/variance/dist/core.js`, so `createVariant`'s merge order and
 * `createStates`'s declaration-order deep merge are the shipping ones.
 *
 * Two reasons this needs bundling rather than a plain import:
 *   1. variance's dist uses extensionless `lodash/get` specifiers, which plain
 *      Node ESM will not resolve.
 *   2. Both packages' `exports` maps have TIGHTENED since gamut-atomics-poc was
 *      built — `@codecademy/gamut-styles/dist/variance/config.js` is no longer
 *      reachable by specifier, and gamut-styles' dist now ships only `.d.ts` for
 *      it. So the prop config and theme come from the oracle's own prebuilt
 *      bundle instead; see the README's "What this cannot answer".
 *
 * Deep relative path, not a package specifier, deliberately: the exports map
 * would reject the specifier and this is a spike input, not a consumer import.
 */
import { variance } from './node_modules/@codecademy/variance/dist/core.js';

import {
  GAMUT_PROPS,
  coreTheme,
} from '../gamut-atomics-poc/dist/gamut-source.bundle.mjs';

export const css = variance.createCss(GAMUT_PROPS);
export const variant = variance.createVariant(GAMUT_PROPS);
export const states = variance.createStates(GAMUT_PROPS);
export { GAMUT_PROPS, coreTheme };
