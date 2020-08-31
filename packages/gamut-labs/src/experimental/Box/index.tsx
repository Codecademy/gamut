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

const getSpacing = composeSystem<MarginProps & PaddingProps>(
  getPadding,
  getMargin
);

export const Box = styled.div<BoxProps>`
  ${getSpacing}
  ${getDisplay}
  ${getPosition}
  ${getBorder}
  ${getTypography}
`;
