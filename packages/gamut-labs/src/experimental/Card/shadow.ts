import { colors, pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export type ShadowOffset = 2 | 4;

const transitionCoefficient = 50;
const shadowOffset = 2;

const createShadowOffset = (offset: ShadowOffset) => {
  return css`
    transform: translate(${pxRem(offset)}, ${pxRem(-1 * offset)});

    &:after {
      transform: translate(
        ${pxRem(-1 * offset * shadowOffset)},
        ${pxRem(offset * shadowOffset)}
      );
    }
  `;
};

export const createShadow = (offsetAmount: 2 | 4, shadowColor?: string) => css`
  position: relative;
  transition: ${offsetAmount * transitionCoefficient}ms transform;

  &:after,
  &:before {
    content: '';
    position: absolute;
    background-color: inherit;
    border-width: inherit;
    border-color: inherit;
    border-radius: inherit;
    border-style: inherit;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
  }

  &:after {
    z-index: -2;
    background-color: ${colors.navy};
    transition: inherit;
  }

  &:before {
    ${shadowColor && `box-shadow: -1px 1px 0 ${shadowColor};`}
    z-index: -1;
  }

  &:hover {
    ${createShadowOffset(offsetAmount)}
  }
`;
