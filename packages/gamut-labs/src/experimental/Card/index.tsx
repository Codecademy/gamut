import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { HoverShadowVariants, BoxVariants } from './types';

import { CARD_VARIANTS } from './constants';
import { createShadowOffset } from './utils';
import { Box } from '../Box';

export type CardProps = {
  /** Background Variation */
  variant?: BoxVariants;
  /** Whether the box should have a border */
  bordered?: boolean;
  /** Position of the hover shadow offset */
  hoverShadow?: HoverShadowVariants;
};

const createShadow = (
  shadowColor: string,
  shadowDirection: HoverShadowVariants
) => css`
  position: relative;
  transition: 0.2s transform;

  &:before,
  &:after {
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

  &:before {
    z-index: -1;
  }

  &:after {
    z-index: -2;
    background-color: ${shadowColor};
    transition: inherit;
  }

  &:hover {
    ${createShadowOffset(4, shadowDirection)}
  }
`;

const cardStyles = ({ variant, bordered, hoverShadow }: CardProps) => {
  const { background, shadow, text, border } = CARD_VARIANTS[variant!];

  return css`
    background-color: ${background};
    color: ${text};
    border-width: 1px;
    border-color: ${border};
    border-radius: 2px;
    border-style: ${bordered ? 'solid' : 'none'};

    ${hoverShadow && createShadow(shadow, hoverShadow)}
  `;
};

export const Card = styled(Box)<CardProps>`
  ${cardStyles}
`;

Card.defaultProps = {
  variant: 'white',
};
