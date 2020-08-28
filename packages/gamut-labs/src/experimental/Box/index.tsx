import styled from '@emotion/styled';
import {
  MarginProps,
  PaddingProps,
  PositionProps,
  BorderProps,
  TypographyProps,
  getPadding,
  getMargin,
  getDisplay,
  DisplayProps,
  getPosition,
  getBorder,
  getTypography,
} from '@codecademy/gamut-styles';

type BoxProps = DisplayProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  BorderProps &
  TypographyProps;

export const Box = styled.div<BoxProps>`
  ${getDisplay}
  ${getPadding}
  ${getMargin}
  ${getPosition}
  ${getBorder}
  ${getTypography}
`;
