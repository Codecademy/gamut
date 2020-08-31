import { mediaQueries } from '../variables/responsive';
import { isObject, entries, merge, mapValues, reduce } from 'lodash';
import { css, SerializedStyles } from '@emotion/core';

import { BorderProps } from './borders';
import { LayoutProps } from './layout';
import { TypographyProps } from './typography';
import { DisplayProps } from './display';
import { PositionProps } from './position';
import { PaddingProps, MarginProps } from './spacing';

export type SystemProps = BorderProps &
  LayoutProps &
  TypographyProps &
  DisplayProps &
  PositionProps &
  PaddingProps &
  MarginProps;

type Props = Partial<SystemProps>;
type Handler<T> = (props: T, noMedia?: boolean) => string | SerializedStyles;

function handleMediaQuery<T extends Props>(handler: Handler<T>): Handler<T> {
  return (systemProps) => {
    const responsive = reduce(
      entries(systemProps),
      (carry, [prop, config]) => {
        if (isObject(config)) {
          return merge(
            carry,
            mapValues(config, (value) => ({ [prop]: value }))
          );
        }

        return merge(carry, { base: { [prop]: config } });
      },
      {} as Record<keyof typeof mediaQueries, Props>
    );

    return css`
      ${entries(responsive).map(([breakpoint, props]) => {
        const rules = handler(props as T);

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
  const responsiveHandler = handleMediaQuery(handler);
  return (props, noMedia = false) =>
    noMedia ? handler(props) : responsiveHandler(props);
}

export function composeSystem<T>(...handlers: Handler<T>[]) {
  return handleMediaQuery(
    (props: T) =>
      css`
        ${handlers.map((handler) => handler(props, true))}
      `
  );
}
