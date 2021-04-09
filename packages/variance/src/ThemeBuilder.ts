import { mapValues, merge, pick } from 'lodash';

import { AbstractTheme } from './types/theme';
import { KeyAsVariable, serializeTokens } from './utils/serializeTokens';

export type Merge<Base extends AbstractTheme, Next> = {
  [K in keyof (Base & Next)]: K extends 'breakpoints'
    ? Base['breakpoints']
    : K extends keyof Next
    ? Next[K]
    : K extends keyof Base
    ? Base[K]
    : {};
};

export class ThemeBuilder<
  BaseTheme extends AbstractTheme,
  Variables extends Record<string, any> = {},
  StaticTokens extends Record<string, any> = {}
> {
  theme = {} as BaseTheme;
  variables = {} as Variables;
  staticTokens = {} as StaticTokens;

  constructor(values: {
    theme: BaseTheme;
    variables?: Variables;
    staticTokens?: StaticTokens;
  }) {
    this.theme = values.theme;
    this.variables = values.variables ?? ({} as Variables);
    this.staticTokens = values.staticTokens ?? ({} as StaticTokens);
  }

  serialize<Key extends keyof Omit<BaseTheme, 'breakpoints'> & string>(
    key: Key
  ) {
    const { theme } = this;

    const { variables, tokens } = serializeTokens(theme[key], key, theme);

    return new ThemeBuilder<
      Merge<BaseTheme, Record<Key, typeof tokens>>,
      typeof variables,
      StaticTokens & Pick<BaseTheme, Key>
    >(
      merge({}, this, {
        theme: { [key]: tokens },
        variables: { root: variables },
        staticTokens: pick(theme, [key]),
      })
    );
  }

  createColorMode<
    Modes extends string,
    InitialMode extends keyof Config,
    Colors extends keyof BaseTheme['colors'],
    Config extends Record<Modes, Record<string, Colors>>
  >(initialMode: InitialMode, modes: Config) {
    const { theme } = this;
    const serialized = serializeTokens(
      mapValues(modes[initialMode], (color) => theme.colors[color]),
      'colors',
      theme
    );

    return new ThemeBuilder<
      Merge<
        BaseTheme,
        {
          colors: KeyAsVariable<Config[keyof Config], 'colors'> &
            BaseTheme['colors'];
          colorModes: { active: keyof Config; modes: Config };
        }
      >,
      Variables,
      StaticTokens
    >(
      merge({}, this, {
        theme: {
          colors: serialized.tokens,
          colorModes: { active: initialMode, modes },
        },
        variables: { colorMode: serialized.variables },
      })
    );
  }

  updateTheme<T extends Record<string, any>>(
    computeTheme: (theme: BaseTheme) => T
  ) {
    const { theme } = this;

    return new ThemeBuilder<Merge<BaseTheme, T>, Variables, StaticTokens>(
      merge({}, this, {
        theme: computeTheme(theme),
      })
    );
  }
  updateTokenSet<Key extends keyof BaseTheme, T extends Record<string, any>>(
    key: Key,
    computeTokens: (tokens: BaseTheme[Key]) => T
  ) {
    const { theme } = this;
    return new ThemeBuilder<
      Merge<BaseTheme, { [K in Key]: Merge<BaseTheme[K], T> }>,
      Variables,
      StaticTokens
    >(
      merge({}, this, {
        [key]: merge({}, theme[key], computeTokens(theme[key])),
      })
    );
  }
}
