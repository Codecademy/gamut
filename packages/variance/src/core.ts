import { get, identity, isArray, isObject, isUndefined, merge } from 'lodash';

import { createScaleLookup } from './scales/createScaleLookup';
import {
  AbstractParser,
  AbstractPropTransformer,
  Compose,
  CSS,
  Parser,
  Prop,
  PropTransformer,
  States,
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
      const { theme } = props;
      // Attempt to cache the breakpoints if we have not yet or if theme has become available.
      if (
        breakpoints === undefined ||
        (breakpoints === null && theme?.breakpoints)
      ) {
        // Save the breakpoints if we can
        breakpoints = parseBreakpoints(theme?.breakpoints);
      }

      // Loops over all prop names on the configured config to check for configured styles
      propNames.forEach((prop) => {
        const property = config[prop];
        const value = get(props, prop);

        switch (typeof value) {
          case 'string':
          case 'number':
          case 'function':
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
    const {
      transform = identity,
      property,
      properties = [property],
      scale,
    } = config;
    const getScaleValue = createScaleLookup(scale);
    const alwaysTransform = scale === undefined || isArray(scale);

    return {
      ...config,
      prop,
      styleFn: (value, prop, props) => {
        const styles: CSSObject = {};

        if (isUndefined(value)) {
          return styles;
        }

        let useTransform = false;
        let intermediateValue: string | number | undefined;
        let scaleValue: string | number | undefined;

        switch (typeof value) {
          case 'number':
          case 'string':
            scaleValue = getScaleValue(value, props);
            useTransform = scaleValue !== undefined || alwaysTransform;
            intermediateValue = scaleValue ?? value;
            break;
          case 'function':
            if (props.theme) {
              intermediateValue = value(props.theme) as
                | string
                | number
                | undefined;
            }
            break;
          default:
            return styles;
        }

        // for each property look up the scale value from theme if passed and apply any
        // final transforms to the value
        properties.forEach((property) => {
          let styleValue: ReturnType<typeof transform> = intermediateValue;

          if (useTransform && !isUndefined(styleValue)) {
            styleValue = transform(styleValue, property, props);
          }
          switch (typeof styleValue) {
            case 'number':
            case 'string':
              return (styles[property] = styleValue);
            case 'object':
              return Object.assign(styles, styleValue);
            default:
          }
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
        'theme', // Just in case this gets passed somehow
        ...selectors,
        ...filteredProps,
      ]);

      return ({ theme }) => {
        if (cache) return cache;
        const css = parser({ ...cssProps, theme } as any);
        selectors.forEach((selector) => {
          const selectorConfig = cssProps[selector] ?? {};
          css[selector] = {
            ...getStaticCss(selectorConfig, filteredProps),
            ...parser({ ...selectorConfig, theme } as any),
          };
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
  createStates<
    Config extends Record<string, Prop>,
    P extends Parser<TransformerMap<Config>>
  >(config: Config): States<P> {
    const css: CSS<P> = this.createCss(config);

    return (states) => {
      const orderedStates = Object.keys(states);
      type Keys = keyof typeof states;
      const stateFns = {} as Record<Keys, (props: ThemeProps) => CSSObject>;

      orderedStates.forEach((key) => {
        const stateKey = key as Keys;
        const cssProps = states[stateKey];
        stateFns[stateKey] = css(cssProps as any);
      });

      return (props) => {
        const styles = {};
        orderedStates.forEach((state) => {
          merge(styles, props[state] && stateFns[state](props));
        });

        return styles;
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
