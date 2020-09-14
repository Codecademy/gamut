import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { spacing } from '@codecademy/gamut-styles';
import { HoverShadowVariants, BoxVariants, PaddingSizes } from './types';

import { BOX_VARIANTS } from './constants';
import { createShadowOffset } from './utils';

export type BoxProps = {
  /** Background Variation */
  variant?: BoxVariants;
  /** Whether the box should have a border */
  bordered?: boolean;
  /** Standard spacing sizes */
  padding?: PaddingSizes;
  /** Position of the hover shadow offset */
  hoverShadow?: HoverShadowVariants;
};

const createShadow = (
  shadowColor: string,
  shadowDirection: HoverShadowVariants
) => css`
  position: relative;
  transition: 0.2s transform;

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
    background-color: ${shadowColor};
    transition: inherit;
  }

  &:before {
    z-index: -1;
  }

  &:hover {
    ${createShadowOffset(4, shadowDirection)}
  }
`;

const boxStyles = ({ padding, variant, bordered, hoverShadow }: BoxProps) => {
  const { background, shadow, text, border } = BOX_VARIANTS[variant!];

  return css`
    background-color: ${background};
    color: ${text};
    padding: ${spacing[padding!]};
    border-width: 1px;
    border-color: ${border};
    border-radius: 2px;
    border-style: ${bordered ? 'solid' : 'none'};

    ${hoverShadow && createShadow(shadow, hoverShadow)}
  `;
};

export const Box = styled.div<BoxProps>`
  ${boxStyles}
`;

Box.defaultProps = {
  variant: 'white',
};
