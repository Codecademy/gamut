import { CSSObject } from '../types/props';
import { AbstractTheme } from '../types/theme';

/**
 * This is a custom generic that ensures the safety of adding additional values to a theme object without accidentally wiping out
 * required keys like `breakpoints`.  It works by creating a new mapped type and merging the values of the union of Base & Next:
 * 1. If the key exists on both Base and Next return the intersection of both values
 * 2. If the key exists on next use the value on next.
 * 3. If the key exists on base but nothing else use the value on base.
 *
 * The resulting type is then rejoined with keys that cannot be mutated (breakpoints) as the next version of Theme
 */
export type MergeTheme<
  Base extends AbstractTheme,
  Next,
  Unmergable = Record<'breakpoints', Base['breakpoints']>
> = Unmergable & Merge<Base, Next>;

/** This merges at 2 levels of depth */
export type Merge<A, B> = {
  [K in keyof (A & B)]: K extends keyof B
    ? K extends keyof A
      ? AssignValueIfUnmergable<A[K], B[K]>
      : B[K]
    : K extends keyof A
    ? A[K]
    : never;
};

/** Extract mergable objects */
export type Mergable<T> = Exclude<
  T,
  ((...args: any) => any) | string | boolean | symbol | number | any[]
>;

/** Return B if either A or B is unmergable */
export type AssignValueIfUnmergable<A, B> = Mergable<A> extends never
  ? B
  : Mergable<B> extends never
  ? B
  : Assign<A, B>;

/** Prefer all values from B */
export type Assign<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never;
};

/** These are keys that are consistent for all theme builds - they are loosely typed as they are not meant to be accessed directly */
export type PrivateThemeKeys = {
  _variables: Record<string, CSSObject>;
  _tokens: Record<string | number, any>;
};

/** This allows 3 layers of color aliases to be constructed when adding colorModes
 * @example
 * {
 *   button: {
 *     bg: {
 *       hover: 'someAlias'
 *     }
 *   }
 * }
 *
 * `button-bg-hover`
 * */
export type ColorModeConfig<Colors> = Record<
  string,
  | Colors
  | Record<string, Colors>
  | Record<string, Colors | Record<string, Colors>>
>;
