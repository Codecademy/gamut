import { entries, reduce, isObject, merge, mapValues } from 'lodash';
import { mediaQueries } from '../../variables/responsive';
import { css } from '@emotion/core';
import { Handler } from '../types';

export function handleMediaQuery<T extends { theme?: any }>(
  handler: Handler<T>
): Handler<T> {
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

export function createSystemHandler<T>(handler: Handler<T>): Handler<T> {
  const responsiveHandler = handleMediaQuery<T>(handler);
  return (props, noMedia = false) =>
    noMedia ? handler(props) : responsiveHandler(props);
}

export function composeSystem<T>(...handlers: Handler<T>[]) {
  return handleMediaQuery<T>(
    (props: T) =>
      css`
        ${handlers.map((handler) => handler(props, true))}
      `
  );
}
