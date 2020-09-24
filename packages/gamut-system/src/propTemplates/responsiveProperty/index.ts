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

    propNames.forEach((propName) => {
      const propConfig = props[propName];

      if (propConfig === undefined) {
        return;
      }

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
      } else if (isObject(propConfig)) {
        Object.entries(propConfig).forEach(([key, value]) => {
          const media = key as MediaSize;
          responsive[media] = {
            ...responsive[media],
            [propName]: value,
          };
        });
      } else {
        responsive['xs'] = {
          ...responsive['xs'],
          [propName]: propConfig,
        };
      }
    });

    let styles: CSSObject = {};

    entries(responsive).forEach(([breakpoint, props]) => {
      const templates = values(templateFns);
      templates.forEach((templatFn) => {
        const templateStyles = templatFn?.(props) || {};

        if (breakpoint === 'xs') {
          styles = {
            ...styles,
            ...templateStyles,
          };
        } else {
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
