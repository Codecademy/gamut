import { get, merge } from 'lodash';

import { AbstractPropTransformer, Parser } from '../types/config';
import { AbstractProps, BreakpointCache, ThemeProps } from '../types/props';
import { orderPropNames } from '../utils/propNames';
import {
  arrayParser,
  isMediaArray,
  isMediaMap,
  objectParser,
  orderBreakpoints,
  parseBreakpoints,
} from '../utils/responsive';

const parseStyles = (
  propNames: string[],
  config: Record<string, AbstractPropTransformer>,
  props: AbstractProps,
  breakpoints: BreakpointCache | null
) => {
  const styles = {};

  propNames.forEach((prop) => {
    const property = config[prop];
    const value = get(props, prop);

    switch (typeof value) {
      case 'string':
      case 'number':
        return Object.assign(styles, property.styleFn(value, prop, props));
      // handle any props configured with the responsive notation
      case 'object':
        if (!breakpoints || value === null) {
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
  // Loops over all prop names on the configured config to check for configured styles

  return breakpoints ? orderBreakpoints(styles, breakpoints.array) : styles;
};

export function createParser<
  Config extends Record<string, AbstractPropTransformer>
>(config: Config): Parser<Config> {
  const propNames = orderPropNames(config);
  let breakpoints: BreakpointCache | null | undefined;

  const parser = (props: ThemeProps) => {
    const { theme } = props;
    // Attempt to cache the breakpoints if we have not yet or if theme has become available.
    if (
      breakpoints === undefined ||
      (breakpoints === null && theme?.breakpoints)
    ) {
      // Save the breakpoints if we can
      breakpoints = parseBreakpoints(theme?.breakpoints);
    }

    return parseStyles(propNames, config, props, breakpoints);
  };
  // return the parser function with the resulting meta information for further composition
  return Object.assign(parser, { propNames, config });
}
