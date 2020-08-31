import { mediaQueries } from '../variables/responsive';
import { isObject, entries, merge, mapValues, reduce } from 'lodash';
import { css, SerializedStyles } from '@emotion/core';
import { getPadding } from './spacing';

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
type Handler = (props: Props, noMedia?: boolean) => string | SerializedStyles;
type HandlerArray = Handler[];

function handleMediaQuery(handler: Handler): Handler {
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

export function createSystemHandler(handler: Handler): Handler {
  const responsiveHandler = handleMediaQuery(handler);
  return (props, noMedia = false) =>
    noMedia ? handler(props) : responsiveHandler(props);
}

export function composeSystem(...handlers: HandlerArray) {
  return handleMediaQuery(
    (props) =>
      css`
        ${handlers.map((handler) => handler(props, true))}
      `
  );
}
