import styled from '@emotion/styled';
import {
  getLayout,
  getPosition,
  getTypography,
  getSpacing,
  getBorder,
  PositionProps,
  TypographyProps,
  SpacingProps,
  LayoutProps,
  BorderProps,
} from '@codecademy/gamut-styles';

type BoxProps = TypographyProps &
  SpacingProps &
  BorderProps &
  LayoutProps &
  PositionProps;

export const Box = styled.div<BoxProps>`
  ${getTypography}
  ${getLayout}
  ${getSpacing}
  ${getBorder}
  ${getPosition}
`;
