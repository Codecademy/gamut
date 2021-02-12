import { get } from 'lodash';

import { AbstractProps, AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { Properties, PropName } from '../types/properties';

export interface Theme {
  boxShadows: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontSize: {
    64: string;
    44: string;
    34: string;
    26: string;
    22: string;
    20: string;
    18: string;
    16: string;
    14: string;
  };
  fontFamily: {
    accent: string;
    base: string;
    monospace: string;
    system: string;
  };
  lineHeight: {
    base: number;
    title: number;
  };
  fontWeight: {
    base: number;
    title: number;
  };
  colors: {
    beige: string;
    blue: string;
    green: string;
    hyper: string;
    lightBlue: string;
    lightGreen: string;
    navy: string;
    orange: string;
    paleBlue: string;
    paleGreen: string;
    palePink: string;
    paleYellow: string;
    pink: string;
    red: string;
    yellow: string;
    black: string;
    white: string;
    'beige-0': string;
    'blue-0': string;
    'blue-300': string;
    'blue-500': string;
    'blue-900': string;
    'green-0': string;
    'green-400': string;
    'green-700': string;
    'yellow-0': string;
    'yellow-500': string;
    'pink-0': string;
    'pink-400': string;
    'red-500': string;
    'orange-500': string;
    'hyper-400': string;
    'hyper-500': string;
    'gray-0': string;
    'gray-100': string;
    'gray-200': string;
    'gray-300': string;
    'gray-400': string;
    'gray-500': string;
    'gray-600': string;
    'gray-700': string;
    'gray-800': string;
    'gray-900': string;
  };
  spacing: {
    0: 0;
    4: string;
    8: string;
    12: string;
    16: string;
    24: string;
    32: string;
    48: string;
    64: string;
  };
}

export interface MediaQueryMap<T> {
  0?: T;
  1?: T;
  2?: T;
  3?: T;
  4?: T;
  5?: T;
  base?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsiveProp<T> = T | MediaQueryMap<T>;

interface Prop<T extends AbstractTheme> {
  property: PropName;
  scale?: keyof T;
  transform?: (val: unknown) => string | number;
}

interface PropFns<T extends AbstractTheme> {
  prop: string;
  property: PropName;
  scale?: keyof T | unknown;
  transform?: ((val: unknown) => string | number) | unknown;
  styleFn: (props: AbstractProps) => CSSObject;
}

type Scale<T extends AbstractTheme, Config extends Prop<T>> = ResponsiveProp<
  Config['scale'] extends keyof T
    ? keyof T[Config['scale']]
    : Properties[Config['property']]['defaultScale']
>;

interface Transform<
  T extends AbstractTheme,
  P extends string,
  Config extends Prop<T>
> {
  (props: { [K in P]?: Scale<T, Config> }): CSSObject;
}

interface PropTransformer<
  T extends AbstractTheme,
  P extends string,
  C extends Prop<T>
> extends PropFns<T> {
  prop: P;
  property: C['property'];
  scale?: C['scale'];
  transform?: C['transform'];
  styleFn: Transform<T, P, C>;
}

interface AbstractParser<T> {
  (props: AbstractProps): CSSObject;
  propNames: string[];
  config: Record<string, PropFns<T>>;
}
interface Parser<
  T extends AbstractTheme,
  Config extends Record<string, PropFns<T>>
> {
  (
    props: {
      [P in keyof Config]?: Parameters<
        Config[P]['styleFn']
      >[0][Config[P]['prop']];
    }
  ): CSSObject;
  propNames: (keyof Config)[];
  config: Config;
}

type Key<T> = T extends string ? T : never;

export const creator = {
  withTheme<T extends AbstractTheme>() {
    return {
      createParser<Config extends Record<string, PropFns<T>>>(config: Config) {
        return {} as Parser<T, Config>;
      },
      createTransform<P extends string, Config extends Prop<T>>(
        prop: P,
        config: Config
      ): PropTransformer<T, P, Config> {
        return {
          ...config,
          prop,
          styleFn: (props) => {
            const value = get(props, prop);
            const scaleValue = get(
              props,
              `theme.${config.scale}.${value}`,
              value
            );

            return {
              [config.property]: scaleValue,
            };
          },
        };
      },
    };
  },
};

type AllUnionKeys<T> = T extends any ? keyof T : never;
type KeyFromUnion<T, K> = T extends any
  ? K extends keyof T
    ? T[K]
    : never
  : never;

export const variance = {
  withTheme<T extends AbstractTheme>() {
    return {
      compose<Args extends AbstractParser<T>[]>(...parsers: Args) {
        const { createParser } = creator.withTheme<T>();

        const config = parsers.reduce(
          (carry, parser) => ({ ...carry, ...parser.config }),
          {}
        ) as {
          [K in AllUnionKeys<Args[number]['config']>]: KeyFromUnion<
            Args[number]['config'],
            K
          >;
        };

        return createParser(config);
      },
      create<Config extends Record<string, Prop<T>>>(config: Config) {
        const { createTransform, createParser } = creator.withTheme<T>();
        const transforms = {} as {
          [P in keyof Config as Key<P>]: PropTransformer<T, Key<P>, Config[P]>;
        };

        for (const prop in config) {
          transforms[prop] = createTransform(prop, config[prop]);
        }

        const parser = createParser(transforms);
        return parser;
      },
    };
  },
};

const { create, compose } = variance.withTheme<Theme>();
export const space = create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

export const layout = create({
  width: { property: 'width' },
  height: { property: 'height' },
});

space.config.margin.styleFn({ margin: 16 });
space.config.margin.styleFn({});
space.propNames;
space({ padding: 4, margin: 16 });

export const myComposed = compose(space, layout);
myComposed({ width: '1', margin: 0 });
myComposed.propNames;
