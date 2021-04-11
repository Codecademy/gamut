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
