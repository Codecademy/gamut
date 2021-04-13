import { get, identity, isObject, merge } from 'lodash';

import {
  AbstractParser,
  AbstractPropTransformer,
  Compose,
  CSS,
  Parser,
  Prop,
  PropTransformer,
  TransformerMap,
  Variant,
} from './types/config';
import { BreakpointCache, CSSObject, ThemeProps } from './types/props';
import { getStaticCss } from './utils/getStaticProperties';
import { orderPropNames } from './utils/propNames';
import {
  arrayParser,
  isMediaArray,
  isMediaMap,
  objectParser,
  orderBreakpoints,
  parseBreakpoints,
} from './utils/responsive';

export const variance = {
  // Parser to handle any set of configured props
  createParser<Config extends Record<string, AbstractPropTransformer>>(
    config: Config
  ): Parser<Config> {
    const propNames = orderPropNames(config);
    let breakpoints: BreakpointCache | null | undefined;

    const parser = (props: ThemeProps) => {
      const styles = {};
      // Attempt to cache the breakpoints if we have not yet or if theme has become available.
      if (
        typeof breakpoints === 'undefined' ||
        (breakpoints === null && props.theme?.breakpoints)
      ) {
        // Save the breakpoints if we can
        breakpoints = props.theme ? parseBreakpoints(props.theme) : null;
      }

      // Loops over all prop names on the configured config to check for configured styles
      propNames.forEach((prop) => {
        const property = config[prop];
        const value = get(props, prop);

        switch (typeof value) {
          case 'string':
          case 'number':
            return Object.assign(styles, property.styleFn(value, prop, props));
          // handle any props configured with the responsive notation
          case 'object':
            if (!breakpoints) {
              return;
            }
            // If it is an array the order of values is smallest to largest: [_, xs, ...]
            if (isMediaArray(value)) {
              return merge(
                styles,
                arrayParser(value, props, property, breakpoints.array)
              );
            }
            // Check to see if value is an object matching the responsive syntax and generate the styles.
            if (isMediaMap(value)) {
              return merge(
                styles,
                objectParser(value, props, property, breakpoints.map)
              );
            }
        }
      });

      return breakpoints ? orderBreakpoints(styles, breakpoints.array) : styles;
    };
    // return the parser function with the resulting meta information for further composition
    return Object.assign(parser, { propNames, config });
  },
  // Given a single property configuration enrich the config with a transform function
  // that traverses the properties the function is responsible for.
  createTransform<P extends string, Config extends Prop>(
    prop: P,
    config: Config
  ): PropTransformer<P, Config> {
    const transform = config.transform ?? identity;
    const properties = config.properties
      ? config.properties
      : [config.property];

    return {
      ...config,
      prop,
      styleFn: (value, prop, props) => {
        const styles: CSSObject = {};
        let scaleVal: string | number | undefined;
        switch (typeof config.scale) {
          case 'string': {
            const path = `theme.${config.scale}.${value}`;
            scaleVal = get(props, path);
            break;
          }
          case 'object': {
            scaleVal = get(config.scale, `${value}`);
            break;
          }
          case 'undefined':
          default:
        }
        const useTransform =
          typeof scaleVal !== 'undefined' ||
          typeof config.scale === 'undefined';
        const usedValue = scaleVal ?? (value as string | number);

        // for each property look up the scale value from theme if passed and apply any
        // final transforms to the value
        properties.forEach((property) => {
          const finalValue = useTransform
            ? transform(usedValue, prop, props)
            : usedValue;
          const mergeStyles = isObject(finalValue)
            ? finalValue
            : { [property]: finalValue };

          Object.assign(styles, mergeStyles);
        });
        // return the resulting styles object
        return styles;
      },
    };
  },
  compose<Args extends AbstractParser[]>(...parsers: Args) {
    return this.createParser(
      parsers.reduce(
        (carry, parser) => ({ ...carry, ...parser.config }),
        {}
      ) as Compose<Args>
    );
  },
  createCss<
    Config extends Record<string, Prop>,
    P extends Parser<TransformerMap<Config>>
  >(config: Config): CSS<P> {
    const parser = this.create(config);
    const filteredProps: string[] = parser.propNames;
    return (cssProps) => {
      let cache: CSSObject;
      const allKeys = Object.keys(cssProps);

      /** Any key of the CSSProps that is not a System Prop or a Static CSS Property is treated as a nested selector */
      const selectors = allKeys.filter(
        (key) => !filteredProps.includes(key) && isObject(cssProps[key])
      );

      /** Static CSS Properties get extracted if they match neither syntax */
      const staticCss = getStaticCss(cssProps, [
        ...selectors,
        ...filteredProps,
      ]);

      return ({ theme }) => {
        if (cache) return cache;
        const css = parser({ ...cssProps, theme } as any);
        selectors.forEach((selector) => {
          const selectorConfig = cssProps[selector];
          if (isObject(selectorConfig)) {
            css[selector] = {
              ...getStaticCss(selectorConfig, filteredProps),
              ...parser(Object.assign(selectorConfig, { theme }) as any),
            };
          }
        });

        /** Merge the static and generated css and save it to the cache */
        cache = {
          ...staticCss,
          ...css,
        };
        return cache;
      };
    };
  },
  createVariant<
    Config extends Record<string, Prop>,
    P extends Parser<TransformerMap<Config>>
  >(config: Config): Variant<P> {
    const css: CSS<P> = this.createCss(config);

    return ({ prop = 'variant', defaultVariant, base = {}, variants }) => {
      type Keys = keyof typeof variants;
      const baseFn = css(base);
      const variantFns = {} as Record<Keys, (props: ThemeProps) => CSSObject>;

      Object.keys(variants).forEach((key) => {
        const variantKey = key as Keys;
        const cssProps = variants[variantKey];
        variantFns[variantKey] = css(cssProps as any);
      });

      return (props) => {
        const { [prop]: selected = defaultVariant } = props;
        const styles = {};
        if (!selected) return styles;

        return merge(
          styles,
          baseFn(props),
          variantFns?.[selected as Keys]?.(props)
        );
      };
    };
  },
  create<Config extends Record<string, Prop>>(config: Config) {
    const transforms = {} as TransformerMap<Config>;

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
