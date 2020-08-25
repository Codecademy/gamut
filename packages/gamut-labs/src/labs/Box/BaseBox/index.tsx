import styled from '@emotion/styled';
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
  padding: ${({ padding }) => spacing[padding!]};
  ${shadowEffect}
  ${({ background }) => background && BACKGROUND_VARIANTS[background]}
  ${({ hoverShadow }) => hoverShadow && SHADOW_VARIANTS[hoverShadow]}
  ${({ bordered }) => bordered && boxBorder}
`;

Box.defaultProps = {
  background: 'white',
};
