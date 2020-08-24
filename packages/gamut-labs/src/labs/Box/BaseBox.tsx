import { css } from '@emotion/core';
import { colors, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

type Variants = 'yellow' | 'navy' | 'white';
type BoxVariants = {
  text: string;
  background: string;
  shadow: string;
  interactive?: string;
};

const {
  white,
  standard: { navy, yellow },
} = colors;

const BOX_VARIANTS: Record<Variants, BoxVariants> = {
  yellow: { text: navy, background: yellow, shadow: navy },
  navy: { text: white, background: navy, shadow: white },
  white: { text: navy, background: white, shadow: navy },
};

export type BoxProps = {
  /** Background Variation */
  variant?: Variants;
  /** Whether the box should have a border */
  bordered?: boolean;
  /** Standard spacing sizes */
  padding?: keyof typeof spacing;
  /** Position of the hover shadow offset */
  shadowPosition?: 'left' | 'right';
};

const border = (color: string) => css`
  border: 1px solid ${color};
  border-radius: 2px;
`;

const translationOffsets = {
  left: {
    body: [spacing[4], `-${spacing[4]}`],
    shadow: [`-${spacing[8]}`, `${spacing[8]}`],
  },
  right: {
    body: [`-${spacing[4]}`, `-${spacing[4]}`],
    shadow: [spacing[8], `${spacing[8]}`],
  },
};

const borderEffect = (
  direction: 'left' | 'right',
  background: string,
  drop: string
) => {
  const { body, shadow } = translationOffsets[direction];
  return css`
  ${border('transparent')}
  border-radius: 2px;
  position: relative;
  background-color: ${background};
  z-index: 1;
  transition: 0.2s transform;

  &:before {
    content: '';
    ${border(navy)}
    background-color: ${background};
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    z-index: -1;
  }

  &:after {
    content: '';
    ${border(navy)}
    background-color: ${drop};
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    z-index: -2;
    transition: 0.2s transform;
  }

  &:hover {
    transform: translate(${body.join(', ')});

    &:after {
      transform: translate(${shadow.join(', ')});
    }
  }
`;
};

export const Box = styled.div<BoxProps>`
  padding: ${({ padding }) => padding && spacing[padding]};

  ${({ variant, bordered, shadowPosition }) => {
    const { background, text, shadow } = BOX_VARIANTS[variant!];
    return css`
      background-color: ${background};
      color: ${text};
      ${bordered && shadowPosition
        ? borderEffect(shadowPosition, background, shadow)
        : border(background)}
    `;
  }}
`;

Box.defaultProps = {
  shadowPosition: 'left',
  variant: 'white',
};
