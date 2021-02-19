import { get, identity, isObject, merge, omit } from 'lodash';

import { BaseProps, baseProps } from './props';
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
      // Destructures the themes breakpoints into an ordered structure to traverse
      getBreakpoints: function (props: ThemeProps<T>): BreakpointCache<T> {
        const breakpoints = props?.theme?.breakpoints;
        if (!breakpoints) return null;

        const { xs, sm, md, lg, xl } = breakpoints;
        return {
          map: breakpoints,
          array: [xs, sm, md, lg, xl],
        };
      },
      // Get each prop name and sort it by the number of properties it handles, most props first, least props last
      getPropNames: function (
        config: Record<string, AbstractPropTransformer<T>>
      ) {
        return Object.keys(config).sort((a, b) => {
          const aProps = config?.[a].properties;
          const bProps = config?.[b].properties;
          if (aProps && bProps) {
            return bProps.length - aProps.length;
          } else if (aProps) {
            return -1;
          } else if (bProps) {
            return 1;
          }
          return 0;
        });
      },
      // Parser to handle any set of configured props
      createParser: function <
        Config extends Record<string, AbstractPropTransformer<T>>
      >(config: Config): Parser<T, Config> {
        let breakpoints: BreakpointCache<T>;
        const propNames = this.getPropNames(config);

        const parser = (props: { theme?: T }) => {
          const styles = {};
          // Get the themes configured breakpoints
          breakpoints = breakpoints ?? this.getBreakpoints(props);

          // Loops over all prop names on the configured config to check for configured styles
          propNames.forEach((prop) => {
            const transform = config[prop].styleFn;
            const value = get(props, prop);

            switch (typeof value) {
              case 'string':
              case 'number':
                Object.assign(styles, transform(value, prop, props));
                break;
              // handle any props configured with the responsive notation
              case 'object':
                if (!breakpoints) return;
                const breakpointStyles = {};

                // If it is an array the order of values is smallest to largest: [base, xs, ...]
                if (isMediaArray(value)) {
                  const [base, ...rest] = value;
                  // the first index is base styles
                  if (base) Object.assign(styles, transform(base, prop, props));

                  // Map over each value in the array and merge the corresponding breakpoint styles
                  // for that property.
                  rest.forEach((val, i) => {
                    const breakpointKey = breakpoints?.array[i];
                    if (!breakpointKey) return;
                    merge(breakpointStyles, {
                      [breakpointKey]: transform(val, prop, props),
                    });
                  });
                }

                // If it is an object with keys
                if (isMediaMap(value)) {
                  const { base = undefined, ...rest } = value;
                  // the keyof 'base' is base styles
                  if (base) Object.assign(styles, transform(base, prop, props));

                  // Map over remaining keys and merge the corresponding breakpoint styles
                  // for that property.
                  Object.keys(rest).forEach((bp: keyof typeof rest) => {
                    const breakpointKey = breakpoints?.map?.[bp];
                    if (!breakpointKey) return;
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
        // return the parser function with the resulting meta information for further composition
        return Object.assign(parser, { propNames, config });
      },
      // Given a single property configuration enrich the config with a transform function
      // that traverses the properties the function is responsible for.
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
            // for each property look up the scale value from theme if passed and apply any
            // final transforms to the value
            properties.forEach((property) => {
              styles[property] = transform(
                get(props, `theme.${config.scale}.${value}`, value),
                prop,
                props
              );
            });
            // return the resulting styles object
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
      // Single function to create variant and css
      createStatic: function <
        Config extends Record<string, Prop<T>>,
        Options extends { withBase: boolean },
        MergeConfig extends Options['withBase'] extends true ? BaseProps : {},
        P extends Parser<T, TransformerMap<T, MergeConfig & Config>>
      >(
        config: Config,
        options?: Options
      ): {
        variant: Variant<T, P>;
        css: CSS<T, P>;
      } {
        const css = this.createCss(
          Object.assign(options?.withBase ? baseProps : {}, config)
        );
        const variant = this.createVariant(css);

        return {
          css,
          variant,
        };
      },
      // Creates a higher order function that accepts static variance props and returns a function that can be called with theme
      createCss: function <
        Config extends Record<string, Prop<T>>,
        P extends Parser<T, TransformerMap<T, Config>>
      >(config: Config): CSS<T, P> {
        // Create a parser from the passed configuration of props
        const parser = this.create(config);

        return (cssProps) => {
          let cache: CSSObject;
          // Check any key that may match a selector and extract them
          const selectors = Object.keys(cssProps).filter((key) =>
            key.match(/(&|\>|\+|~)/g)
          );

          return ({ theme }) => {
            // If cache has been set escape
            if (cache) return cache;
            // Omit any props that are selector styles and generate the base CSS
            const css = parser({
              ...(omit(cssProps, selectors) as Parameters<P>[0]),
              theme,
            });
            // For every key that matches a selector call the parser with the value of that key
            selectors.forEach((selector) => {
              const selectorConfig = cssProps[selector];
              if (isObject(selectorConfig)) {
                // Set the key on our returned object to the generated CSS
                css[selector] = parser(
                  Object.assign(selectorConfig, { theme })
                );
              }
            });
            // Set CSS to the cache
            cache = css;
            return cache;
          };
        };
      },
      /** Creates a higher order function that accepts a set of keyed static props to return a
       * function that accepts theme and a prop of any key on thee configuration object
       */
      createVariant: function <
        Config extends Record<string, Prop<T>>,
        P extends Parser<T, TransformerMap<T, Config>>,
        StyleFunc extends CSS<T, P>
      >(css: StyleFunc): Variant<T, P> {
        return (variants, options) => {
          type Keys = keyof typeof variants;
          // Set the default prop signature to variant if none has been configuraed.
          const prop = options?.prop || 'variant';
          const defaultVariant = options?.defaultVariant;

          const variantFns = {} as Record<
            Keys,
            (props: ThemeProps<T>) => CSSObject
          >;
          // For each of the variants create a CSS function from the configured props to be called when
          // the return function is invoked.
          Object.keys(variants).forEach((key) => {
            const variantKey = key as Keys;
            const cssProps = variants[variantKey];
            variantFns[variantKey] = css(cssProps);
          });

          // Return the initialed final props
          return ({ [prop]: selected = defaultVariant, ...props }) => {
            // Call the correct css function with our defaulted key or return an empty object
            return variantFns?.[selected as Keys]?.(props) ?? {};
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

        // Create a parser that handles all the props within the config
        return this.createParser(transforms);
      },
    };
  },
};
