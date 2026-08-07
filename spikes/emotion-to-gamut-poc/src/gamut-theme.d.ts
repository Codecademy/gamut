import type { CoreTheme } from './gamut/theme';

/* THEME TYPE SAFETY — with no Emotion anywhere, at runtime OR in types.
 *
 * `variance` needs one mutable, global type slot to learn what your theme
 * contains, so that `scale: 'colors'` typechecks and token names autocomplete.
 * That slot used to be Emotion's `Theme` interface — Emotion did nothing with it;
 * it just happened to be the interface everyone augmented. `variance` now owns
 * the slot itself (packages/variance/src/types/theme.ts), so this augmentation
 * is the same shape against a different module:
 *
 *   - declare module '@emotion/react'        { export interface Theme extends CoreTheme {} }
 *   + declare module '@codecademy/variance'  { export interface Theme extends CoreTheme {} }
 *
 * That is the whole migration for the 19 real augmentation sites (18 in mono,
 * 1 in platform/src/themes/platform.d.ts). */
declare module '@codecademy/variance' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CoreTheme {}
}
