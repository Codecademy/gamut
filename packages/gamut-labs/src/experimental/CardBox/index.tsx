import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, pxRem, variant } from '@codecademy/gamut-styles';

import { Box } from '@codecademy/gamut';
import { HandlerProps } from '@codecademy/gamut-system';

const transitionCoefficient = 50;
const shadowOffset = 2;

export type ShadowOffset = 2 | 4;
export type CardBoxProps = { shadowOffset?: ShadowOffset } & HandlerProps<
  typeof cardVariants
>;

const cardVariants = variant({
  yellow: {
    backgroundColor: 'yellow',
    textColor: 'navy',
    borderColor: 'navy',
  },
  navy: {
    backgroundColor: 'navy',
    textColor: 'white',
    borderColor: 'navy',
  },
  white: {
    backgroundColor: 'white',
    textColor: 'navy',
    borderColor: 'navy',
  },
});

export const CardBox = styled(Box)<CardBoxProps>`
  ${cardVariants}

  ${({ shadowOffset, variant }) =>
    shadowOffset &&
    createShadow(shadowOffset, variant === 'navy' ? 'white' : 'none')}
`;

CardBox.defaultProps = {
  padding: 16,
  variant: 'white',
  borderRadius: '2px',
  borderWidth: '1px',
  borderStyle: 'solid',
};

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

const createShadow = (offsetAmount: 2 | 4, shadowColor?: string) => css`
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
