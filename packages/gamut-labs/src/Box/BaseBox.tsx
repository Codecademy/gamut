import { css } from '@emotion/core';
import { colors, spacing, SpacingSize } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export type BoxProps = {
  /** Whether the box should have a border */
  borderType?: 'solid' | 'drop-left' | 'drop-right';
  padding?: SpacingSize;
};

const boxBorder = css`
  border: 1px solid ${colors.standard.navy};
  border-radius: 2px;
`;

const dropPattern = (direction: 'left' | 'right') =>
  css`
    ${boxBorder}
    position: relative;
    background-color: ${colors.white};
    z-index: 1;

    &:before {
      content: '';
      background-color: ${colors.white};
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
    }

    &:after {
      content: '';
      background-color: ${colors.standard.navy};
      width: 100%;
      height: 100%;
      top: ${spacing[8]};
      ${`${direction}: ${spacing[8]}`};
      position: absolute;
      z-index: -2;
    }
  `;

const getBorder = ({ borderType }: Partial<BoxProps>) => {
  switch (borderType) {
    case 'solid': {
      return boxBorder;
    }
    case 'drop-left': {
      return dropPattern('left');
    }
    case 'drop-right': {
      return dropPattern('right');
    }
  }
};

export const Box = styled.div<BoxProps>`
  background-color: ${colors.white};
  ${getBorder};
  ${({ padding }) =>
    padding && `padding: ${spacing[padding]} ${spacing[padding]};`}
`;
