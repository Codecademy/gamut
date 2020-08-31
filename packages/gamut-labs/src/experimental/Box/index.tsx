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
  composeSystem,
} from '@codecademy/gamut-styles';

type BoxProps = DisplayProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  BorderProps &
  TypographyProps;

export const Box = styled.div<BoxProps>`
  ${composeSystem(getPadding, getMargin)}
  ${getDisplay}
  ${getPosition}
  ${getBorder}
  ${getTypography}
`;
