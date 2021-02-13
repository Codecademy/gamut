import { get, merge } from 'lodash';

import {
  AbstractParser,
  AbstractPropTransformer,
  CSS,
  Parser,
  Prop,
  PropTransformer,
  Variant,
} from './types/config';
import {
  AbstractTheme,
  CSSObject,
  MediaQueryMap,
  ThemeProps,
} from './types/props';
import { AllUnionKeys, Key, KeyFromUnion } from './types/utils';

const isMediaArray = (val: unknown): val is (string | number)[] =>
  Array.isArray(val);

const isMediaMap = (val: object): val is MediaQueryMap<string | number> =>
  Object.keys(val).some((key) =>
    ['base', 'xs', 'sm', 'md', 'lg', 'xl'].includes(key)
  );

const isObject = (val: unknown): val is object => typeof val === 'object';

const identity = <T extends string | number>(val: T) => val;

export const creator = {
  withTheme<T extends AbstractTheme>() {
    return {
      getBreakpoints: function (props: { theme: T }) {
        const breakpoints = props?.theme?.breakpoints;
        if (!breakpoints) return null;
        const { xs, sm, md, lg, xl } = breakpoints;
        return {
          map: breakpoints,
          array: [xs, sm, md, lg, xl],
        };
      },
      createParser: function <
        Config extends Record<string, AbstractPropTransformer<T>>
      >(config: Config) {
        let cache: { map: T['breakpoints']; array: string[] } | null;
        const propNames = Object.keys(config);
        const parser = (props: { theme: T }) => {
          const styles = {};
          const breakpoints =
            cache === undefined ? this.getBreakpoints(props) : cache;
          if (cache === undefined) {
            cache = breakpoints;
          }
          propNames.forEach((prop) => {
            const transform = config[prop].styleFn;
            const value = get(props, prop);
            switch (typeof value) {
              case 'string':
              case 'number':
                Object.assign(styles, transform(value, prop, props));
                break;
              case 'object':
                if (!breakpoints) return;
                const breakpointStyles = {};

                if (isMediaArray(value)) {
                  const [base, ...rest] = value;
                  if (base) Object.assign(styles, transform(base, prop, props));
                  rest.forEach((val, i) => {
                    merge(breakpointStyles, {
                      [breakpoints.array[i]]: transform(val, prop, props),
                    });
                  });
                  merge(styles, breakpointStyles);
                  break;
                }
                if (isMediaMap(value)) {
                  const { base = undefined, ...rest } = value;
                  if (base) Object.assign(styles, transform(base, prop, props));
                  Object.keys(rest).forEach((bp: keyof typeof rest) => {
                    merge(breakpointStyles, {
                      [breakpoints.map![bp]]: transform(rest[bp], prop, props),
                    });
                  });

                  merge(styles, breakpointStyles);
                  break;
                }
            }
          });
          return styles;
        };

        return Object.assign(parser, { propNames, config }) as Parser<
          T,
          Config
        >;
      },
      createTransform: function <P extends string, Config extends Prop<T>>(
        prop: P,
        config: Config
      ): PropTransformer<T, P, Config> {
        const transform = config.transform ?? identity;
        const properties = config.properties
          ? config.properties
          : [config.property];

        return {
          ...config,
          prop,
          styleFn: (value, prop, props) => {
            const styles: CSSObject = {};
            properties.forEach((property) => {
              styles[property] = transform(
                get(props, `theme.${config.scale}.${value}`, value),
                prop,
                props
              );
            });
            return styles;
          },
        };
      },
    };
  },
};

export const variance = {
  withTheme: function <T extends AbstractTheme>() {
    return {
      compose: function <Args extends AbstractParser<T>[]>(...parsers: Args) {
        const styleFnCreator = creator.withTheme<T>();
        type MergedParser = {
          [K in AllUnionKeys<Args[number]['config']>]: KeyFromUnion<
            Args[number]['config'],
            K
          >;
        };
        return styleFnCreator.createParser(
          parsers.reduce(
            (carry, parser) => ({ ...carry, ...parser.config }),
            {}
          ) as MergedParser
        );
      },
      createCss: function <Config extends Record<string, Prop<T>>>(
        config: Config
      ): CSS<
        T,
        Parser<
          T,
          {
            [P in Key<keyof Config>]: PropTransformer<T, Key<P>, Config[P]>;
          }
        >
      > {
        const parser = this.create(config);

        return (cssProps) => {
          let cache: CSSObject;
          const selectors = Object.keys(cssProps).filter((key) =>
            key.match(/(&|>|\+|~)/g)
          );

          return ({ theme }) => {
            if (cache) return cache;
            const css = parser({ ...cssProps, theme });
            selectors.forEach((selector) => {
              const selectorConfig = cssProps[selector];
              if (isObject(selectorConfig)) {
                css[selector] = parser(
                  Object.assign(selectorConfig, { theme })
                );
              }
            });
            cache = css;

            return cache;
          };
        };
      },
      createVariant: function <
        Config extends Record<string, Prop<T>>,
        P extends Parser<
          T,
          {
            [P in Key<keyof Config>]: PropTransformer<T, Key<P>, Config[P]>;
          }
        >
      >(config: Config): Variant<T, P> {
        const css: CSS<T, P> = this.createCss(config);

        return (variants, options) => {
          type Keys = keyof typeof variants;
          const variantFns = {} as Record<
            Keys,
            (props: ThemeProps<T>) => CSSObject
          >;
          Object.keys(variants).forEach((key) => {
            const variantKey = key as Keys;
            const cssProps = variants[variantKey];
            variantFns[variantKey] = css(cssProps);
          });
          return ({
            [options?.prop ||
            'variant']: selectedVariant = options?.defaultVariant,
            ...props
          }) => {
            if (!selectedVariant) return {};
            return variantFns[selectedVariant](props);
          };
        };
      },
      create: function <Config extends Record<string, Prop<T>>>(
        config: Config
      ) {
        const styleFnCreator = creator.withTheme<T>();
        const transforms = {} as {
          [P in Key<keyof Config>]: PropTransformer<T, P, Config[P]>;
        };

        for (const prop in config) {
          transforms[prop] = styleFnCreator.createTransform(prop, config[prop]);
        }

        const parser = styleFnCreator.createParser(transforms);
        return parser;
      },
    };
  },
};
