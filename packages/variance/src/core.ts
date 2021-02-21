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
import { orderPropNames } from './utils/propNames';
import {
  arrayParser,
  isMediaArray,
  isMediaMap,
  objectParser,
  parseBreakpoints,
} from './utils/responsive';

export const variance = {
  withTheme: function <T extends AbstractTheme>() {
    return {
      // Parser to handle any set of configured props
      createParser: function <
        Config extends Record<string, AbstractPropTransformer<T>>
      >(config: Config): Parser<T, Config> {
        let breakpoints: BreakpointCache;
        const propNames = orderPropNames(config);

        const parser = (props: { theme?: T }) => {
          const styles = {};
          // Get the themes configured breakpoints
          breakpoints = breakpoints ?? parseBreakpoints(props?.theme) ?? {};
          const { map, array } = breakpoints;

          // Loops over all prop names on the configured config to check for configured styles
          propNames.forEach((prop) => {
            const property = config[prop];
            const value = get(props, prop);

            switch (typeof value) {
              case 'string':
              case 'number':
                return Object.assign(
                  styles,
                  property.styleFn(value, prop, props)
                );
              // handle any props configured with the responsive notation
              case 'object':
                if (!map && !array) return;
                // If it is an array the order of values is smallest to largest: [base, xs, ...]
                if (isMediaArray(value)) {
                  return merge(
                    styles,
                    arrayParser(value, props, property, array)
                  );
                }
                // If it is an object with keys
                if (isMediaMap(value)) {
                  return merge(
                    styles,
                    objectParser(value, props, property, map)
                  );
                }
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
            const path = `theme.${config.scale}.${value}`;
            const scaleVal = get(props, path, value);
            // for each property look up the scale value from theme if passed and apply any
            // final transforms to the value
            properties.forEach((property) => {
              styles[property] = transform(scaleVal, prop, props);
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
