import { entries, isArray, isObject, values } from 'lodash';
import { mediaQueries, MediaSize } from '../../variables/responsive';
import { css } from '@emotion/core';
import { StyleTemplate, AbstractProps, AnyStyle, Handler } from '../types';

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

    return css`
      ${entries(responsive).map(([breakpoint, props]) => {
        const styles: (AnyStyle | AnyStyle[])[] = [];
        const templates = values(templateFns);
        for (let i = 0; i < templates.length; i += 1) {
          const rule = templates?.[i]?.(props);
          if (rule) {
            styles.push(rule);
          }
        }
        if (breakpoint === 'xs') {
          return styles;
        }
        return css`
          ${mediaQueries[breakpoint as keyof typeof mediaQueries]} {
            ${styles}
          }
        `;
      })}
    `;
  };
}
