import type { CoreTheme } from './gamut/theme';

/* The ONE remaining Emotion touchpoint, and it is types-only.
 *
 * `@codecademy/variance` anchors its whole prop type system to Emotion's `Theme`
 * at exactly two lines:
 *
 *   packages/variance/src/types/props.ts:1     import { Theme } from '@emotion/react';
 *   packages/variance/src/types/config.ts:31   scale?: keyof Theme | MapScale | ArrayScale;
 *
 * Without this augmentation `Theme` is `{}`, so `keyof Theme` is `never` and every
 * `scale: 'colors'` in the prop config degrades — you get cascading nonsense errors
 * on `css()` calls and on component children.
 *
 * Every mono app already has a file exactly like this (18 of them, plus 1 in
 * platform), so this is NOT extra migration work — it's what exists today.
 *
 * A real migration repoints those two variance lines at a Gamut-owned registry,
 * after which this file becomes:
 *
 *   declare module '@codecademy/gamut-styles' {
 *     export interface GamutTheme extends CoreTheme {}
 *   }
 *
 * Nothing at runtime imports Emotion — see src/gamut/, which is Emotion-free. */
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CoreTheme {}
}
