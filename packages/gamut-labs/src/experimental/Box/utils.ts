import { css } from '@emotion/core';
import { pxRem } from '@codecademy/gamut-styles';
import { PaddingSizes } from './types';

const offsets = {
  left: [1, -1],
  right: [-1, -1],
};

const shadowOffset = 2;

export const createShadowOffset = (
  offset: PaddingSizes,
  direction: 'left' | 'right'
) => {
  const [xCoeff, yCoeff] = offsets[direction];

  return css`
    transform: translate(${pxRem(xCoeff * offset)}, ${pxRem(yCoeff * offset)});

    &:after {
      transform: translate(
        ${pxRem(-1 * xCoeff * offset * shadowOffset)},
        ${pxRem(-1 * yCoeff * offset * shadowOffset)}
      );
    }
  `;
};
