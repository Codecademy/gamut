import { css } from '@emotion/core';

export const neg = (value: string) => `-${value}`;

export const createShadowOffset = (element: string[], shadow: string[]) => {
  return css`
    transform: translate(${element.join(', ')});

    &:after {
      transform: translate(${shadow.join(', ')});
    }
  `;
};
