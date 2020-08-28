import styled from '@emotion/styled';
import {
  MarginProps,
  PaddingProps,
  PositionProps,
  getPadding,
  getMargin,
  getDisplay,
  DisplayProps,
  getPosition,
} from '@codecademy/gamut-styles';

type BoxProps = DisplayProps & MarginProps & PaddingProps & PositionProps;

export const Box = styled.div<BoxProps>`
  ${getDisplay}
  ${getPadding}
  ${getMargin}
  ${getPosition}
`;
