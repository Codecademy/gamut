import { CSSObject } from '@emotion/core';
import { assign, entries, isArray, isObject, set } from 'lodash';

import { ResponsiveProperty } from '../../types/props';
import { StyleTemplate } from '../../types/templates';

/**
 * Given a template to generate a style object from a provided prop description,
 * returns a function that create a responsive CSS property when given props.
 */
export function createResponsiveStyles<Props extends AbstractProps>(
  styleTemplate: StyleTemplate<Props>
): ResponsiveProperty<Props> {
  /**
   * Given a set of props, creates a CSS object factoring in those prop values.
   * Prop values may be direct CSS values, responsive arrays, or responsive objects.0
   */
  return (props) => {
    const { breakpoints, breakpointsOrder } = props.theme;
    const responsiveStyles: Record<string, Props> = {};

    // For each prop, we'll run its corresponding transform and store it in our responsive styles.
    entries(props).forEach(([propName, propertyValue]) => {
      switch (typeof propertyValue) {
        // Direct number and string values can be directly added to the first (lowest) breakpoint.
        case 'number':
        case 'string':
          return set(
            responsiveStyles,
            [breakpointsOrder[0], propName],
            propertyValue
          );

        case 'object': {
          // Arrays of configs are a shorthand for declaring responsive values.
          // For each value, we store it under its corresponding indexed breakpoint.
          if (isArray(propertyValue)) {
            return propertyValue.forEach((value, mediaIndex) => {
              if (value !== undefined) {
                return set(
                  responsiveStyles,
                  [breakpointsOrder[mediaIndex], propName],
                  value
                );
              }
            });
          }

          // Objects map from breakpoint keys to values at that breakpoint.
          if (isObject(propertyValue)) {
            return entries(propertyValue).forEach(([mediaSize, value]) => {
              set(responsiveStyles, [mediaSize, propName], value);
            });
          }
        }
      }
    });

    // Now that we have the responsive prop descriptions in our format,
    // we'll need to map them into a native CSS-in-JS object.
    let styles: CSSObject = {};

    // We'll do so by parsing each (breakpoint, value) pair from our responsive descriptions.
    entries(responsiveStyles).forEach(([breakpoint, propsAtBreakpoint]) => {
      // Turn just the styles at this particular breakpoint into a CSS-in-JS object.
      const templateStyles = styleTemplate({
        ...propsAtBreakpoint,
        theme: props.theme,
      });

      // Smallest sizes are always on by default, and are directly placed as CSS properties.
      if (breakpoint === breakpointsOrder[0]) {
        return assign(styles, templateStyles);
      }

      // For all sizes higher, create a new @media object in styles.
      const breakpointKey = breakpoints[breakpoint];
      styles[breakpointKey] = assign(styles[breakpointKey], templateStyles);
    });

    return styles;
  };
}
