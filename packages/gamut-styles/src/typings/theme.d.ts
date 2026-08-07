import '@codecademy/variance';
import '@emotion/react';

import { CoreTheme } from '../themes';

/* Registers Gamut's theme so `scale: 'colors'` typechecks and token names
 * autocomplete.
 *
 * WHY TWO DECLARATIONS (transitional):
 *
 * `variance` needs one mutable, global type slot to learn what the theme contains.
 * That slot used to be Emotion's `Theme` interface — Emotion did nothing with it;
 * it just happened to be the interface everyone augmented. `variance` now owns the
 * slot itself (`variance/src/types/theme.ts`), so its type system no longer
 * depends on Emotion at all.
 *
 * The Emotion declaration stays only because `gamut-styles` still uses Emotion's
 * `ThemeProvider` / `useTheme` at RUNTIME, and those are typed by Emotion's
 * `Theme`. It becomes deletable the moment that provider is replaced — see
 * `spikes/emotion-to-gamut-poc`, which drops it entirely.
 *
 * Both point at the same `CoreTheme`, so they cannot drift. */
declare module '@codecademy/variance' {
  export interface Theme extends CoreTheme {
    useLogicalProperties?: boolean;
  }
}

declare module '@emotion/react' {
  export interface Theme extends CoreTheme {
    useLogicalProperties?: boolean;
  }
}
