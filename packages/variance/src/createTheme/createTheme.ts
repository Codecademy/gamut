import { mapValues, merge } from 'lodash';

import { CSSObject } from '../types/props';
import { AbstractTheme } from '../types/theme';
import { flattenObject, LiteralPaths } from './flattenScale';
import { KeyAsVariable, serializeTokens } from './serializeTokens';

export type Merge<
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

export type CSSVariables<T, Prefix extends string> = {
  [K in Extract<keyof T, string> as `--${Prefix}-${K}`]: string;
};

type Reserved = {
  _variables: Record<string, CSSObject>;
  _tokens: Record<string | number, any>;
};

class ThemeBuilder<T extends AbstractTheme> {
  #theme = {} as T;

  constructor(baseTheme: T) {
    this.#theme = baseTheme;
  }
  /**
   *
   * @param key A key of the current theme to transform into CSS Variables and Variable References
   * @example .createScaleVariables('fontSize')
   */
  createScaleVariables<Key extends keyof Omit<T, 'breakpoints'> & string>(
    key: Key
  ): ThemeBuilder<
    Merge<T & Reserved, Record<Key, KeyAsVariable<T[Key], Key>>>
  > {
    const { variables, tokens } = serializeTokens(
      this.#theme[key],
      key,
      this.#theme
    );

    this.#theme = merge({}, this.#theme, {
      [key]: tokens,
      _variables: { root: variables },
      _tokens: {
        [key]: this.#theme[key],
      },
    });

    return this;
  }

  /**
   *
   * @param colors A map of color tokens to add to the theme. These tokens are immediately converted to CSS Variables `--color-${key}`.
   * @example .addColors({ navy: 'navy', hyper: 'purple' })
   */
  addColors<
    Colors extends Record<string, string | number | CSSObject>,
    NextColors extends LiteralPaths<Colors>
  >(
    colors: Colors
  ): ThemeBuilder<
    Merge<T & Reserved, Record<'colors', KeyAsVariable<NextColors, 'color'>>>
  > {
    const { variables, tokens } = serializeTokens(
      flattenObject(colors),
      'color',
      this.#theme
    );
    this.#theme = merge({}, this.#theme, {
      colors: tokens,
      _variables: { root: variables },
      _tokens: { colors },
    });

    return this;
  }

  /**
   *
   * @param initialMode A key of the object passed for modes.  This sets the default state for the theme and transforms the correct variables.
   * @param modes A map of color modes with keys of each possible mode with a value of alias to color keys.  This must be called after `addColors`
   * @example .addColorModes('light', { light: { primary: 'hyper' }, { dark: { primary: 'navy' } } })
   */
  addColorModes<
    Modes extends string,
    InitialMode extends keyof Config,
    Colors extends keyof T['colors'],
    ModeColors extends Record<string, Record<string, Colors> | Colors>,
    Config extends Record<Modes, ModeColors>
  >(
    initialMode: InitialMode,
    modes: Config
  ): ThemeBuilder<
    Merge<
      T & Reserved,
      {
        colors: KeyAsVariable<LiteralPaths<Config[keyof Config]>, 'colors'> &
          T['colors'];
        modes: { [K in keyof Config]: LiteralPaths<Config[K]> };
        mode: keyof Config;
        _getColorValue: (color: keyof T['colors']) => string;
      }
    >
  > {
    const { tokens, variables } = serializeTokens(
      mapValues(
        flattenObject(modes[initialMode]),
        (color) => this.#theme.colors[color]
      ),
      'color',
      this.#theme
    );

    this.#theme = merge({}, this.#theme, {
      colors: tokens,
      modes: mapValues(modes, (value) => {
        return flattenObject(value);
      }),
      mode: initialMode,
      _getColorValue: (color: keyof T['colors']) =>
        this.#theme._tokens?.colors?.[color],
      _variables: { mode: variables },
    });

    return this;
  }

  /**
   *
   * @param key A new key of theme
   * @param createScale A function that accepts the current theme and returns a new object of scale values.
   * @example .addScale('fonts', () => ({ basic: 'Gotham', cool: 'Wingdings' }))
   */
  addScale<
    Key extends string,
    Fn extends (theme: T) => Record<string | number, unknown>
  >(
    key: Key,
    createScale: Fn
  ): ThemeBuilder<Merge<T, Record<Key, ReturnType<Fn>>>> {
    this.#theme = merge({}, this.#theme, { [key]: createScale(this.#theme) });
    return this;
  }

  /**
   *
   * @param key A current key of theme to be updated with new or computed values
   * @param updateFn A function that accepts an argument of the current values at the specified keys an returns a map of new values to merge.
   * @example .updateScale('fonts', ({ basic }) => ({ basicFallback: `{basic}, Montserrat` }))
   */
  updateScale<
    Key extends keyof T,
    Fn extends (tokens: T[Key]) => Record<string | number, unknown>
  >(
    key: Key,
    updateFn: Fn
  ): ThemeBuilder<T & Record<Key, T[Key] & ReturnType<Fn>>> {
    this.#theme = merge({}, this.#theme, { [key]: updateFn(this.#theme[key]) });

    return this;
  }

  /**
   * This finalizes the theme build and returns the final theme and variables to be provided.
   */
  build(): T & Reserved {
    return merge({}, this.#theme, { _variables: {}, _tokens: {} });
  }
}

export function createTheme<T extends AbstractTheme>(base: T) {
  return new ThemeBuilder(base);
}
