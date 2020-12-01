import { pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

import { ShadowOffset } from './types';

const shadowOffset = 2;

export const createShadowOffset = (offset: ShadowOffset) => {
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
