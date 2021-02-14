import { get, identity, isObject, merge } from 'lodash';

import {
  AbstractParser,
  AbstractPropTransformer,
  CSS,
  Parser,
  Prop,
  PropTransformer,
  TransformerMap,
  Variant,
} from './types/config';
import {
  AbstractTheme,
  BreakpointCache,
  CSSObject,
  ThemeProps,
} from './types/props';
import { AllUnionKeys, KeyFromUnion } from './types/utils';
import { isMediaArray, isMediaMap } from './utils';

export const variance = {
  withTheme: function <T extends AbstractTheme>() {
    return {
      getBreakpoints: function (props: { theme: T }): BreakpointCache<T> {
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
      >(config: Config): Parser<T, Config> {
        let cache: BreakpointCache<T>;
        const propNames = Object.keys(config);

        //
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
                    const breakpointKey = breakpoints.array[i];

                    merge(breakpointStyles, {
                      [breakpointKey]: transform(val, prop, props),
                    });
                  });
                }

                if (isMediaMap(value)) {
                  const { base = undefined, ...rest } = value;

                  if (base) Object.assign(styles, transform(base, prop, props));

                  Object.keys(rest).forEach((bp: keyof typeof rest) => {
                    const breakpointKey = get(breakpoints, `map.${bp}`);
                    merge(breakpointStyles, {
                      [breakpointKey]: transform(rest[bp], prop, props),
                    });
                  });
                }
                merge(styles, breakpointStyles);
            }
          });
          return styles;
        };

        return Object.assign(parser, { propNames, config });
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
      compose: function <Args extends AbstractParser<T>[]>(...parsers: Args) {
        type MergedParser = {
          [K in AllUnionKeys<Args[number]['config']>]: KeyFromUnion<
            Args[number]['config'],
            K
          >;
        };
        return this.createParser(
          parsers.reduce(
            (carry, parser) => ({ ...carry, ...parser.config }),
            {}
          ) as MergedParser
        );
      },
      createCss: function <
        Config extends Record<string, Prop<T>>,
        P extends Parser<T, TransformerMap<T, Config>>
      >(config: Config): CSS<T, P> {
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
        P extends Parser<T, TransformerMap<T, Config>>
      >(config: Config): Variant<T, P> {
        const css: CSS<T, P> = this.createCss(config);

        return (variants, options) => {
          type Keys = keyof typeof variants;
          const prop = options?.prop || 'variant';
          const defaultVariant = options?.defaultVariant;

          const variantFns = {} as Record<
            Keys,
            (props: ThemeProps<T>) => CSSObject
          >;

          Object.keys(variants).forEach((key) => {
            const variantKey = key as Keys;
            const cssProps = variants[variantKey];
            variantFns[variantKey] = css(cssProps);
          });

          return ({ [prop]: selected = defaultVariant, ...props }) => {
            if (!selected) return {};
            return variantFns[selected](props);
          };
        };
      },
      create: function <Config extends Record<string, Prop<T>>>(
        config: Config
      ) {
        const transforms = {} as TransformerMap<T, Config>;

        // Create a transform function for each of the props
        for (const prop in config) {
          transforms[prop] = this.createTransform(prop, config[prop]);
        }

        // Create a parser that handles are the props
        return this.createParser(transforms);
      },
    };
  },
};
