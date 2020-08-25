import styled from '@emotion/styled';
import { shadowEffect, boxBorder, BOX_VARIANTS, HOVER_EFFECTS } from './utils';
import { spacing } from '@codecademy/gamut-styles';
import { HoverShadowVariants, Variants, PaddingSizes } from './types';

export type BoxProps = {
  /** Background Variation */
  variant?: Variants;
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
  ${({ variant }) => variant && BOX_VARIANTS[variant]}
  ${({ bordered }) => bordered && boxBorder}
  ${({ hoverShadow }) => hoverShadow && HOVER_EFFECTS[hoverShadow]}
`;

Box.defaultProps = {
  variant: 'white',
};
