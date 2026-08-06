import type { CoreTheme } from './gamut/engine/theme';

/* The theme-type registry, and the one place Emotion still appears in this spike.
 *
 * WHY: `@codecademy/variance` anchors its whole prop type system to Emotion's
 * `Theme` in exactly two lines —
 *
 *   packages/variance/src/types/props.ts:1     import { Theme } from '@emotion/react';
 *   packages/variance/src/types/config.ts:31   scale?: keyof Theme | MapScale | ArrayScale;
 *
 * so without this augmentation `keyof Theme` is `never` and every
 * `scale: 'colors'` in the prop config fails to typecheck. Nothing at runtime
 * touches Emotion (see src/gamut/engine — zero `@emotion/*` imports); this is
 * purely the type anchor.
 *
 * The real migration repoints those two lines at Gamut's own `GamutTheme`
 * registry, after which this file becomes:
 *
 *   declare module '@codecademy/gamut-styles' {
 *     export interface GamutTheme extends CoreTheme {}
 *   }
 *
 * — the identical shape the 19 real consumer augmentation sites (18 in mono, 1 in
 * platform/src/themes/platform.d.ts) codemod to. */
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CoreTheme {}
}
