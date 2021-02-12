import { assign, get, identity, isArray, isObject, merge } from 'lodash';

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

export interface MediaQueryArray<T> {
  0?: T;
  1?: T;
  2?: T;
  3?: T;
  4?: T;
  5?: T;
}
export interface MediaQueryMap<T> {
  base?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsiveProp<T> = T | MediaQueryMap<T> | MediaQueryArray<T>;

export interface Prop<T extends AbstractTheme> {
  property: PropName;
  scale?: keyof T;
  transform?: (val: unknown) => string | number;
}

export interface PropFns<T extends AbstractTheme> {
  prop: string;
  property: PropName;
  scale?: keyof T | unknown;
  transform?: ((val: unknown) => string | number) | unknown;
  styleFn: (value: unknown, prop: string, props: AbstractProps) => CSSObject;
}

export type Scale<
  T extends AbstractTheme,
  Config extends Prop<T>
> = ResponsiveProp<
  Config['scale'] extends keyof T
    ? keyof T[Config['scale']]
    : Properties[Config['property']]['defaultScale']
>;

export interface Transform<
  T extends AbstractTheme,
  P extends string,
  Config extends Prop<T>
> {
  (
    value: Scale<T, Config>,
    prop: P,
    props: { [K in P]?: Scale<T, Config> } & { theme?: T }
  ): CSSObject;
}

export interface PropTransformer<
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

export interface AbstractParser<T> {
  (props: AbstractProps): CSSObject;
  propNames: string[];
  config: Record<string, PropFns<T>>;
}
export interface Parser<
  T extends AbstractTheme,
  Config extends Record<string, PropFns<T>>
> {
  (
    props: {
      [P in keyof Config]?: Parameters<
        Config[P]['styleFn']
      >[2][Config[P]['prop']];
    } & { theme?: T }
  ): CSSObject;
  propNames: (keyof Config)[];
  config: Config;
}

export type Key<T> = T extends string ? T : never;

const isMediaArray = (val: unknown): val is (string | number)[] => isArray(val);

const isMediaMap = (val: unknown): val is MediaQueryMap<string | number> =>
  isObject(val);

const getBreakpoints = <T extends AbstractTheme>(props: { theme: T }) => {
  const breakpoints = props.theme.breakpoints!;
  const { xs, sm, md, lg, xl } = breakpoints;
  return {
    map: breakpoints,
    array: [xs, sm, md, lg, xl],
  };
};

export const creator = {
  withTheme<T extends AbstractTheme>() {
    return {
      createParser<Config extends Record<string, PropFns<T>>>(config: Config) {
        let cache: { map: T['breakpoints']; array: string[] };
        const propNames = Object.keys(config);
        const parser = (props: { theme: T }) => {
          let styles = {};
          const breakpoints = cache ?? getBreakpoints(props);
          if (!cache) {
            cache = breakpoints;
          }
          propNames.forEach((prop) => {
            const transform = config[prop].styleFn;
            const value = get(props, prop);
            switch (typeof value) {
              case 'string':
              case 'number':
                assign(styles, transform(value, prop, props));
                break;
              case 'object':
                if (isMediaArray(value)) {
                  const [base, ...rest] = value;
                  if (base) assign(styles, transform(base, prop, props));
                  const breakpointStyles = {};
                  rest.forEach((val, i) => {
                    merge(breakpointStyles, {
                      [breakpoints.array[i]]: transform(val, prop, props),
                    });
                  });
                  styles = merge(styles, breakpointStyles);
                  break;
                }
                if (isMediaMap(value)) {
                  const breakpointStyles = {};
                  const { base = undefined, ...rest } = value;
                  if (base) assign(styles, transform(base, prop, props));
                  Object.keys(rest).forEach((bp: keyof typeof rest) => {
                    merge(breakpointStyles, {
                      [breakpoints.map![bp]]: transform(rest[bp], prop, props),
                    });
                  });
                  styles = merge(styles, breakpointStyles);
                  break;
                }
            }
          });
          return styles;
        };

        return assign(parser, { propNames, config }) as Parser<T, Config>;
      },
      createTransform<P extends string, Config extends Prop<T>>(
        prop: P,
        config: Config
      ): PropTransformer<T, P, Config> {
        const transform = config.transform ?? identity;
        const parseValue = (
          value: unknown,
          prop: string,
          props: AbstractProps
        ) => {
          return transform(get(props, `theme.${config.scale}.${value}`, value));
        };

        return {
          ...config,
          prop,
          styleFn: (value, prop, props) => {
            return {
              [config.property]: parseValue(value, prop, props),
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

export const cool = variance.withTheme<Theme>().create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});
