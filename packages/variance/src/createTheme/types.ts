import { CSSObject } from '../types/props';
import { AbstractTheme } from '../types/theme';

export type MergeTheme<
  Base extends AbstractTheme,
  Next,
  Unmergable = Record<'breakpoints', Base['breakpoints']>
> = Unmergable &
  {
    [K in keyof (Base & Next)]: K extends keyof Next
      ? K extends keyof Base
        ? Base[K] & Next[K]
        : Next[K]
      : K extends keyof Base
      ? Base[K]
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
