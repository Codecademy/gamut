import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { shadowEffect, boxBorder } from './utils';
import { spacing } from '@codecademy/gamut-styles';
import { HoverShadowVariants, BackgroundVariants, PaddingSizes } from './types';

import { SHADOW_VARIANTS, BACKGROUND_VARIANTS } from './constants';

export type BoxProps = {
  /** Background Variation */
  background?: BackgroundVariants;
  /** Whether the box should have a border */
  bordered?: boolean;
  /** Standard spacing sizes */
  padding?: PaddingSizes;
  /** Position of the hover shadow offset */
  hoverShadow?: HoverShadowVariants;
};

export const Box = styled.div<BoxProps>`
  z-index: 1;
  position: relative;
  padding: ${({ padding }) => spacing[padding!]};
  ${({ bordered }) => bordered && boxBorder}
  ${({ background }) => background && BACKGROUND_VARIANTS[background]}
  ${({ hoverShadow }) =>
    hoverShadow &&
    css`
      ${shadowEffect}
      ${SHADOW_VARIANTS[hoverShadow]}
    `}
`;

Box.defaultProps = {
  background: 'white',
};
