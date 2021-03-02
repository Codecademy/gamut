import { get, identity, merge } from 'lodash';

import {
  AbstractParser,
  AbstractPropTransformer,
  Parser,
  Prop,
  PropTransformer,
  TransformerMap,
} from './types/config';
import { AbstractTheme, CSSObject, ThemeProps } from './types/props';
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
  withTheme<T extends AbstractTheme>(theme: T) {
    const breakpoints = parseBreakpoints(theme);

    return {
      // Parser to handle any set of configured props
      createParser<Config extends Record<string, AbstractPropTransformer<T>>>(
        config: Config
      ): Parser<T, Config> {
        const propNames = orderPropNames(config);

        const parser = (props: ThemeProps<T>) => {
          const styles = {};
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
                // If it is an array the order of values is smallest to largest: [base, xs, ...]
                if (isMediaArray(value)) {
                  return merge(
                    styles,
                    arrayParser(value, props, property, array)
                  );
                }
                // Check to see if value is an object matching the responsive syntax and generate the styles.
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
      createTransform<P extends string, Config extends Prop<T>>(
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
            let scaleVal: string | number;
            switch (typeof config.scale) {
              case 'string': {
                const path = `theme.${config.scale}.${value}`;
                scaleVal = get(props, path, value);
                break;
              }
              case 'object': {
                scaleVal = get(config.scale, `${value}`);
                break;
              }
              default:
                scaleVal = value as string | number;
            }

            // for each property look up the scale value from theme if passed and apply any
            // final transforms to the value
            properties.forEach((property) => {
              styles[property] = transform(scaleVal, property, props);
            });
            // return the resulting styles object
            return styles;
          },
        };
      },
      compose<Args extends AbstractParser<T>[]>(...parsers: Args) {
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
      create<Config extends Record<string, Prop<T>>>(config: Config) {
        const transforms = {} as TransformerMap<T, Config>;

        // Create a transform function for each of the props
        for (const prop in config) {
          if (typeof prop === 'string') {
            transforms[prop] = this.createTransform(prop, config[prop]);
          }
        }

        // Create a parser that handles all the props within the config
        return this.createParser(transforms);
      },
    };
  },
};
