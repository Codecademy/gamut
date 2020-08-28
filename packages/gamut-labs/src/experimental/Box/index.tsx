import styled from '@emotion/styled';
import {
  MarginProps,
  PaddingProps,
  PositionProps,
  BorderProps,
  getPadding,
  getMargin,
  getDisplay,
  DisplayProps,
  getPosition,
  getBorder,
} from '@codecademy/gamut-styles';

type BoxProps = DisplayProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  BorderProps;

export const Box = styled.div<BoxProps>`
  ${getDisplay}
  ${getPadding}
  ${getMargin}
  ${getPosition}
  ${getBorder}
`;
