import { css } from '@emotion/core';
import { pxRem } from '@codecademy/gamut-styles';
import { ShadowOffset } from './types';

const shadowOffset = 2;

export const createShadowOffset = (
  offset: ShadowOffset,
) => {
  const [xCoeff, yCoeff] = [1, -1];

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
