import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, spacing } from '@codecademy/gamut-styles';
import { ShadowOffset, PaddingSizes } from './types';

import { BOX_VARIANTS, BoxVariants } from './constants';
import { createShadowOffset } from './utils';

export type BoxProps = {
  /** Background Variation */
  variant?: BoxVariants;
  /** Whether the box should have a border */
  bordered?: boolean;
  /** Standard spacing sizes */
  padding?: PaddingSizes;
  /** Position of the hover shadow offset */
  shadowOffset?: ShadowOffset;
};

const transitionCoefficient = 50;

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

const boxStyles = ({
  padding,
  variant = 'white',
  bordered,
  shadowOffset,
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

    ${shadowOffset && createShadow(shadowOffset, shadow)}
  `;
};

export const Box = styled.div<BoxProps>`
  ${boxStyles}
`;

Box.defaultProps = {
  variant: 'white',
};
