export interface Breakpoints<T = string> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
  c_base: T;
  c_xs: T;
  c_sm: T;
  c_md: T;
  c_lg: T;
  c_xl: T;
}

export interface BaseTheme {
  breakpoints: Breakpoints;
}

export interface AbstractTheme extends BaseTheme {
  readonly [key: string]: any;
}

/**
 * The augmentable theme registry.
 *
 * `variance` needs one mutable, global type slot that an app can extend with its
 * real theme, so that `scale: 'colors'` typechecks and token names autocomplete.
 * That slot used to be Emotion's `Theme` interface — Emotion was never doing
 * anything with it, it just happened to be the interface everyone augmented.
 * Owning it here removes variance's only dependency on Emotion.
 *
 * Consumers augment it exactly as they augmented Emotion's:
 *
 * ```ts
 * import type { CoreTheme } from '@codecademy/gamut-styles';
 *
 * declare module '@codecademy/variance' {
 *   export interface Theme extends CoreTheme {}
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Theme extends BaseTheme {}
