import { mapValues, merge } from 'lodash';

import { AbstractTheme } from '../types/theme';
import { KeyAsVariable, serializeTokens } from './serializeTokens';

export type Merge<
  Base extends AbstractTheme,
  Next,
  Unmergable = Record<'breakpoints', Base['breakpoints']>
> = Unmergable &
  {
    [K in keyof (Base & Next)]: K extends keyof Next
      ? Next[K]
      : K extends keyof Base
      ? Base[K]
      : never;
  };

export type CSSVariables<T, Prefix extends string> = {
  [K in Extract<keyof T, string> as `--${Prefix}-${K}`]: string;
};

class ThemeBuilder<
  T extends AbstractTheme,
  V extends Record<string | number | symbol, any> = {},
  S extends Record<string | number | symbol, any> = {}
> {
  private theme = {} as T;
  private variables = {} as V;
  private staticTokens = {} as S;

  constructor(baseTheme: T) {
    this.theme = baseTheme;
  }
  /**
   *
   * @param key A key of the current theme to transform into CSS Variables and Variable References
   * @example .createScaleVariables('fontSize')
   */
  createScaleVariables<Key extends keyof Omit<T, 'breakpoints'> & string>(
    key: Key
  ): ThemeBuilder<
    Merge<T, Record<Key, KeyAsVariable<T[Key], Key>>>,
    V & Record<'root', CSSVariables<T[Key], Key>>,
    S & Record<Key, T[Key]>
  > {
    const { variables, tokens } = serializeTokens(
      this.theme[key],
      key,
      this.theme
    );

    this.theme = merge({}, this.theme, { [key]: tokens });
    this.variables = merge({}, this.variables, { root: variables });
    this.staticTokens = merge({}, this.staticTokens, {
      [key]: this.theme[key],
    });

    return this;
  }

  /**
   *
   * @param colors A map of color tokens to add to the theme. These tokens are immediately converted to CSS Variables `--color-${key}`.
   * @example .addColors({ navy: 'navy', hyper: 'purple' })
   */
  addColors<Colors extends Record<string, string>>(
    colors: Colors
  ): ThemeBuilder<
    Merge<T, Record<'colors', KeyAsVariable<Colors, 'color'>>>,
    V & Record<'root', CSSVariables<Colors, 'color'>>,
    S & Record<'colors', Colors>
  > {
    const { variables, tokens } = serializeTokens(colors, 'color', this.theme);
    this.theme = merge({}, this.theme, { colors: tokens });
    this.variables = merge({}, this.variables, { root: variables });
    this.staticTokens = merge({}, this.staticTokens, { colors });

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
    Config extends Record<Modes, Record<string, Colors>>
  >(
    initialMode: InitialMode,
    modes: Config
  ): ThemeBuilder<
    Merge<
      T,
      {
        colors: KeyAsVariable<Config[keyof Config], 'colors'> & T['colors'];
        colorModes: { active: keyof Config; modes: Config };
      }
    >,
    V & Record<'colorMode', CSSVariables<Config[InitialMode], 'colors'>>,
    S
  > {
    const { tokens, variables } = serializeTokens(
      mapValues(modes[initialMode], (color) => this.theme.colors[color]),
      'color',
      this.theme
    );

    this.theme = merge({}, this.theme, {
      colors: tokens,
      colorModes: { active: initialMode, modes },
    });

    this.variables = merge({}, this.variables, { colorMode: variables });

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
  ): ThemeBuilder<Merge<T, Record<Key, ReturnType<Fn>>>, V, S> {
    this.theme = merge({}, this.theme, { [key]: createScale(this.theme) });
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
  ): ThemeBuilder<T & Record<Key, T[Key] & ReturnType<Fn>>, V, S> {
    this.theme = merge({}, this.theme, { [key]: updateFn(this.theme[key]) });

    return this;
  }

  /**
   * This finalizes the theme build and returns the final theme and variables to be provided.
   */
  build(): {
    theme: T;
    variables: V;
    getColorValue: (color: keyof T['colors']) => string;
  } {
    return {
      theme: this.theme,
      variables: this.variables,
      getColorValue: (color: keyof T['colors']) =>
        this.staticTokens?.colors?.[color],
    };
  }
}

export function createTheme<T extends AbstractTheme>(base: T) {
  return new ThemeBuilder(base);
}
