import { entries, isArray, isObject, values } from 'lodash';
import { CSSObject } from '@emotion/core';
import {
  StyleTemplate,
  AbstractProps,
  Handler,
  AbstractTheme,
} from '../../types/system';

type PropertyConfig<T extends AbstractProps> = {
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

type MediaSize = keyof typeof DEFAULT_MEDIA_QUERIES;
const MEDIA: (keyof typeof DEFAULT_MEDIA_QUERIES)[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

export function responsiveProperty<
  Theme extends AbstractTheme,
  Props extends { theme?: Theme }
>({ propNames, templateFns }: PropertyConfig<Props>): Handler<Props> {
  return (props) => {
    const responsive = {} as Record<MediaSize | 'base', Props>;

    // Iterate through all responsible props and create a base style configuration.
    propNames.forEach((propName) => {
      // only select the props we want
      const propConfig = props[propName];

      // Escape if this is undefined.
      if (propConfig === undefined) {
        return;
      }

      // Add to the config if it is an array of prop values
      if (isArray(propConfig)) {
        propConfig.forEach((value, i) => {
          const media = MEDIA[i];
          if (value === undefined) {
            return;
          }
          responsive[media] = {
            ...responsive[media],
            [propName]: value,
          };
        });
        // Add to the config if it is an object of sizes / values
      } else if (isObject(propConfig)) {
        Object.entries(propConfig).forEach(([key, value]) => {
          const media = key as MediaSize;
          responsive[media] = {
            ...responsive[media],
            [propName]: value,
          };
        });
        // Otherwise add it as the smallest media size.
      } else {
        responsive['xs'] = {
          ...responsive['xs'],
          [propName]: propConfig,
        };
      }
    });

    let styles: CSSObject = {};

    // Iterate through each breakpoints sorted props
    entries(responsive).forEach(([breakpoint, bpProps]) => {
      const templates = values(templateFns);

      // TODO: Only call the templateFns we have props for.
      templates.forEach((templatFn) => {
        const templateStyles =
          templatFn?.({ ...bpProps, theme: props.theme }) || {};

        // Smallest sizes are always on by default
        if (breakpoint === 'xs') {
          styles = {
            ...styles,
            ...templateStyles,
          };
        } else {
          // For all sizes higher, create a new media object.
          const breakpointKey = DEFAULT_MEDIA_QUERIES[breakpoint as MediaSize];
          const existingStyles = (styles[breakpointKey] || {}) as CSSObject;

          styles[breakpointKey] = {
            ...existingStyles,
            ...templateStyles,
          };
        }
      });
    });

    return styles;
  };
}
