import {
  assign,
  entries,
  get,
  hasIn,
  isArray,
  isObject,
  set,
  values,
} from 'lodash';

import {
  AbstractProps,
  AbstractTheme,
  HandlerMeta,
  StyleTemplate,
} from '../../types/config';
import { CSSObject } from '../../types/css';
import { BASE, DEFAULT_MEDIA_QUERIES, GLOBAL_PROPERTIES } from './constants';

export function createResponsiveStyleTemplate<
  Props extends { theme?: AbstractTheme }
>({
  propNames,
  styleTemplates,
}: HandlerMeta<Props>): (props: Props) => CSSObject {
  let styles: CSSObject = {};
  let responsive: Record<string, Props> = {};

  const templates = values(styleTemplates).filter(
    Boolean
  ) as StyleTemplate<AbstractProps>[];

  return (props) => {
    styles = {};
    responsive = {};

    const { theme = {}, ...styleProps } = props;
    const { breakpoints = DEFAULT_MEDIA_QUERIES } = theme;
    const breakpointMap: Record<string, string> = breakpoints;
    const breakpointOrder = [BASE, ...Object.keys(breakpoints)];

    const handledProps = propNames.filter((propName) =>
      hasIn(styleProps, propName)
    );

    if (handledProps.length === 0) {
      return styles;
    }

    GLOBAL_PROPERTIES.forEach((global) => {
      const value = get(props, global);

      if (value !== undefined) {
        styles[global] = value;
      }
    });

    // Iterate through all responsible props and create a base style configuration.
    handledProps.forEach((propName) => {
      const propertyValue = props[propName];

      // Handle responsive configurations properly.
      switch (typeof propertyValue) {
        case 'string':
        case 'number':
          // If no extra styles exist add this to the lowest breakpoint
          return set(responsive, [BASE, propName], propertyValue);
        case 'object': {
          // Add to the config if it is an array of prop values
          if (isArray(propertyValue)) {
            return propertyValue.forEach((value, mediaIndex) => {
              if (value !== undefined) {
                set(responsive, [breakpointOrder[mediaIndex], propName], value);
              }
            });
          }
          // Add to the config if it is an object of sizes / values
          if (isObject(propertyValue)) {
            return entries(propertyValue).forEach(([mediaSize, value]) => {
              set(responsive, [mediaSize, propName], value);
            });
          }
        }
        default:
          return;
      }
    });

    // Iterate through each breakpoints sorted props
    entries(responsive).forEach(([breakpoint, bpProps]) => {
      const propsForBreakpoint = { ...bpProps, theme };
      const mediaQuery = breakpointMap[breakpoint];
      // TODO: Only call the templateFns we have props for.1
      templates.forEach((styleFunction) => {
        const templateStyles = styleFunction(propsForBreakpoint);
        if (!templateStyles) {
          return;
        }
        // Smallest sizes are always on by default
        if (breakpoint === BASE) {
          styles = assign(styles, templateStyles);
        } else {
          // For all sizes higher, create a new media object.
          styles[mediaQuery] = assign(styles[mediaQuery], templateStyles);
        }
      });
    });

    return styles;
  };
}
