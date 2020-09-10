import { entries, isObject } from 'lodash';
import { mediaQueries, MediaSize } from '../../variables/responsive';
import { css } from '@emotion/core';
import { StyleTemplate } from '../types';

export function responsiveProperty<T extends { theme?: any }>({
  propNames,
  templateFns,
}: {
  propNames: (keyof T)[];
  templateFns: Partial<Record<keyof T, StyleTemplate<T>>>;
}): StyleTemplate<T> {
  return (props) => {
    const responsive = {} as Record<keyof typeof mediaQueries | 'base', T>;

    propNames.forEach((propName) => {
      const propConfig = props[propName];
      if (!propConfig) {
        return;
      }

      if (isObject(propConfig)) {
        Object.entries(propConfig).forEach(([key, value]) => {
          const media = key as MediaSize;
          if (media === 'xs') {
            responsive['base'] = {
              ...responsive['base'],
              [propName]: value,
            };
          } else {
            responsive[media] = {
              ...responsive[media],
              [propName]: value,
            };
          }
        });
      } else {
        responsive['base'] = {
          ...responsive['base'],
          [propName]: propConfig,
        };
      }
    });

    return css`
      ${entries(responsive).map(([breakpoint, props]) => {
        const rules = Object.entries(templateFns).map(([propName, fn]) => {
          const rule = fn && fn(props);
          return rule ? rule : '';
        });

        if (breakpoint === 'base') {
          return css`
            ${rules}
          `;
        }
        return css`
          ${mediaQueries[breakpoint as keyof typeof mediaQueries]} {
            ${rules}
          }
        `;
      })}
    `;
  };
}
