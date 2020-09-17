import { entries, isArray, isObject, values } from 'lodash';
import { mediaQueries, MediaSize } from '../../../variables/responsive';
import { CSSObject } from '@emotion/core';
import { StyleTemplate, AbstractProps, Handler } from '../../types';

type PropertyConfig<T extends AbstractProps> = {
  propNames: (keyof T)[];
  templateFns: Partial<Record<keyof T, StyleTemplate<T>>>;
};

const MEDIA: MediaSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function responsiveProperty<T extends { theme?: any }>({
  propNames,
  templateFns,
}: PropertyConfig<T>): Handler<T> {
  return (props) => {
    const responsive = {} as Record<keyof typeof mediaQueries | 'base', T>;

    propNames.forEach((propName) => {
      const propConfig = props[propName];

      if (!propConfig) {
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
          const breakpointKey = mediaQueries[breakpoint as MediaSize];
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
