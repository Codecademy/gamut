import { createPhysicalPattern } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { PATTERN_VARIANTS, PatternFills } from './constants';

export type PatternProps = {
  width?: number;
  height?: number;
  xOffset?: number;
  yOffset?: number;
  variant: PatternFills;
};

export const Pattern = styled.div<PatternProps>`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  width: ${({ width }) => width}%;
  height: ${({ height }) => height}%;
  ${({ xOffset, yOffset }) =>
    css`
      transform: translate(
        calc(-50% + ${xOffset || 0}px),
        calc(-50% + ${yOffset || 0}px)
      );
    `};
  ${({ variant }) => createPhysicalPattern({ url: PATTERN_VARIANTS[variant] })}
`;

Pattern.defaultProps = {
  width: 100,
  height: 100,
  xOffset: 0,
  yOffset: 0,
};

export { PATTERN_VARIANTS };
