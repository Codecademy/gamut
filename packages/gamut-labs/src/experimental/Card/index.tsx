import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, spacing } from '@codecademy/gamut-styles';
import {
  HoverShadowVariants,
  PaddingSizes,
} from '@codecademy/gamut-labs/src/experimental/Card/types';

import {
  BOX_VARIANTS,
  BoxVariants,
} from '@codecademy/gamut-labs/src/experimental/Card/constants';
import { createShadowOffset } from '@codecademy/gamut-labs/src/experimental/Card/utils';

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
  shadowDirection: HoverShadowVariants,
  shadowColor?: string
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
    background-color: ${colors.navy};
    transition: inherit;
  }

  &:before {
    ${shadowColor && `box-shadow: -1px 1px 0 ${shadowColor};`}
    z-index: -1;
  }

  &:hover {
    ${createShadowOffset(4, shadowDirection)}
  }
`;

const boxStyles = ({
  padding,
  variant = 'white',
  bordered,
  hoverShadow,
}: BoxProps) => {
  const { background, shadow, text, border } = BOX_VARIANTS[variant];

  return css`
    background-color: ${background};
    color: ${text};
    padding: ${spacing[padding!]};
    border-width: 1px;
    border-color: ${border};
    border-radius: 2px;
    border-style: ${bordered ? 'solid' : 'none'};

    ${hoverShadow && createShadow(hoverShadow, shadow)}
  `;
};

export const Box = styled.div<BoxProps>`
  ${boxStyles}
`;

Box.defaultProps = {
  variant: 'white',
};
