import styled from '@emotion/styled';
import {
  getTypography,
  getSpacing,
  getBorder,
  TypographyProps,
  SpacingProps,
  BorderProps,
  PositionProps,
  getLayout,
  LayoutProps,
  getPosition,
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
