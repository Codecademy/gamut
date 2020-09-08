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
  getMargin,
} from '@codecademy/gamut-styles';

type BoxProps = TypographyProps & BorderProps & LayoutProps & PositionProps;

export const Box = styled.div<BoxProps>`
  ${getMargin}
`;

getMargin({ margin: 0 });
