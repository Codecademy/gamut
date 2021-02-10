import { get } from 'lodash';

import { AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { Properties, PropName } from '../types/properties';
import { UnionToIntersection } from '../types/utils';

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

export interface MediaQuery<T> {
  0?: T;
  1?: T;
  2?: T;
  3?: T;
  4?: T;
  5?: T;
}

export interface MediaQueryMap<T> extends MediaQuery<T> {
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

type Scale<
  T extends AbstractTheme,
  Config extends Prop<T>
> = Config['scale'] extends keyof T
  ? keyof T[Config['scale']]
  : Properties[Config['property']]['defaultScale'];

interface Transform<T extends AbstractTheme, Config extends Prop<T>> {
  (props: Record<PropName, Scale<T, Config>>): CSSObject;
}

interface Parser<
  T extends AbstractTheme,
  Config extends Record<string, Prop<T>>,
  Transforms extends {
    [P in keyof Config as Key<P>]: Transform<T, Config[P]>;
  }
> {
  (
    props: { [Prop in keyof Config]?: ResponsiveProp<Scale<T, Config[Prop]>> }
  ): CSSObject;
  propNames: (keyof Transforms)[];
  config: Config;
}

type Key<T> = T extends string ? T : never;

export const creator = {
  withTheme<T extends AbstractTheme>() {
    return {
      createParser<
        Config extends Record<string, Prop<T>>,
        Transforms extends {
          [P in keyof Config as Key<P>]: Transform<T, Config[P]>;
        }
      >(config: Config, transforms: Transforms) {
        return {} as Parser<T, Config, Transforms>;
      },
      createTransform<PropName extends string, Config extends Prop<T>>(
        prop: PropName,
        config: Config
      ): Transform<T, Config> {
        return (props) => {
          const value = get(props, prop);
          const scaleValue = get(
            props,
            `theme.${config.scale}.${value}`,
            value
          );

          return {
            [config.property]: scaleValue,
          };
        };
      },
    };
  },
};

export const variance = {
  withTheme<T extends AbstractTheme>() {
    return {
      compose<
        Parsers extends Parser<
          T,
          Record<string, Prop<T>>,
          Record<string, Transform<T, Prop<T>>>
        >[],
        Union extends UnionToIntersection<Parsers[number]>
      >(...parsers: Parsers) {
        const { createTransform, createParser } = creator.withTheme<T>();

        return {} as Union;
      },
      create<Config extends Record<string, Prop<T>>>(config: Config) {
        const { createTransform, createParser } = creator.withTheme<T>();
        const transforms = {} as {
          [P in keyof Config as Key<P>]: Transform<T, Config[P]>;
        };

        for (const prop in config) {
          transforms[prop] = createTransform(prop, config[prop]);
        }

        const parser = createParser(config, transforms);
        return parser;
      },
    };
  },
};

const { create, compose } = variance.withTheme<Theme>();
export const margin = create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

export const layout = create({
  width: { property: 'width' },
  height: { property: 'height' },
});

export const hello = compose(margin, layout);
hello;

hello({ margin: 4 });
