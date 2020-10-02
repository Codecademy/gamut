import { assign, entries, isArray, isObject, set, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import {
  StyleTemplate,
  AbstractProps,
  AbstractTheme,
} from '../../types/system';

export type ResponsivePropertyArguments<T extends AbstractProps> = {
  propNames: (keyof T)[];
  templateFns: Partial<Record<keyof T, StyleTemplate<T>>>;
};

export const DEFAULT_MEDIA_QUERIES = {
  xs: '@media (min-width: 320px)',
  sm: '@media (min-width: 480px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1248px)',
};

export function responsiveProperty<
  Theme extends AbstractTheme,
  Props extends { theme?: Theme }
>({
  propNames,
  templateFns,
}: ResponsivePropertyArguments<Props>): (props: Props) => CSSObject {
  return (props) => {
    const { breakpoints = DEFAULT_MEDIA_QUERIES } = props?.theme || {};

    const breakpointOrder = ['base', 'xs', 'sm', 'md', 'lg', 'xl'];

    const responsive = {} as Record<
      keyof typeof DEFAULT_MEDIA_QUERIES | 'base',
      Props
    >;

    // Iterate through all responsible props and create a base style configuration.
    propNames.forEach((propName) => {
      const propertyValue = props[propName];

      // Handle responsive configurations properly.
      switch (typeof propertyValue) {
        case 'string':
        case 'number':
          // If no extra styles exist add this to the lowest breakpoint
          return set(responsive, ['base', propName], propertyValue);
        case 'object': {
          // Add to the config if it is an array of prop values
          if (isArray(propertyValue)) {
            return propertyValue.forEach((value, mediaIndex) => {
              if (value !== undefined) {
                return set(
                  responsive,
                  [breakpointOrder[mediaIndex], propName],
                  value
                );
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

    let styles: CSSObject = {};

    // Iterate through each breakpoints sorted props
    entries(responsive).forEach(([breakpoint, bpProps]) => {
      const templates = values(templateFns);

      // TODO: Only call the templateFns we have props for.
      templates.forEach((templatFn) => {
        const templateStyles =
          templatFn?.({ ...bpProps, theme: props.theme }) ?? {};

        // Smallest sizes are always on by default
        if (breakpoint === breakpointOrder[0]) {
          styles = assign(styles, templateStyles);
        } else {
          // For all sizes higher, create a new media object.
          const breakpointKey =
            breakpoints[breakpoint as keyof typeof breakpoints];
          styles[breakpointKey] = assign(styles[breakpointKey], templateStyles);
        }
      });
    });

    return styles;
  };
}
