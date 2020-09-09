import { entries, reduce, isObject, merge, mapValues } from 'lodash';
import { mediaQueries } from '../../variables/responsive';
import { css } from '@emotion/core';
import { Handler, StyleTemplate } from '../types';

export function responsiveProperty<T extends { theme?: any }>(
  handler: Handler<T>
): StyleTemplate<T> {
  return (systemProps) => {
    const { theme, ...configuredProps } = systemProps;
    const responsive = reduce(
      entries(configuredProps),
      (carry, [prop, config]) => {
        if (isObject(config)) {
          return merge(
            carry,
            mapValues(config, (value) => ({ [prop]: value }))
          );
        }

        return merge(carry, { base: { [prop]: config } });
      },
      {} as Record<keyof typeof mediaQueries, T>
    );

    return css`
      ${entries(responsive).map(([breakpoint, props]) => {
        const rules = handler(props);

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
