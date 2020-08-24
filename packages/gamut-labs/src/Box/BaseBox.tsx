import { css } from '@emotion/core';
import { colors, spacing, SpacingSize } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export type BoxProps = {
  /** Whether the box should have a border */
  bordered?: boolean;
  padding?: SpacingSize;
  shadowPosition?: 'left' | 'right';
};

const boxBorder = css`
  border: 1px solid ${colors.standard.navy};
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

const borderEffect = (direction: 'left' | 'right') => {
  const { body, shadow } = translationOffsets[direction];
  return css`
  border: 1px solid transparent;
  border-radius: 2px;
  position: relative;
  background-color: ${colors.white};
  z-index: 1;
  transition: 0.2s transform;

  &:before {
    content: '';
    ${boxBorder}
    background-color: ${colors.white};
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    z-index: -1;
  }

  &:after {
    content: '';
    background-color: ${colors.standard.navy};
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
  background-color: ${colors.white};
  ${({ bordered, shadowPosition }) => bordered && borderEffect(shadowPosition!)}
  ${({ padding }) =>
    padding && `padding: ${spacing[padding]} ${spacing[padding]};`}
`;

Box.defaultProps = {
  shadowPosition: 'left',
};
