import styled from '@emotion/styled';
import {
  MarginProps,
  PaddingProps,
  getPadding,
  getMargin,
} from '@codecademy/gamut-styles';

type BoxProps = MarginProps & PaddingProps;

export const Box = styled.div<BoxProps>`
  display: block;
  ${getPadding}
  ${getMargin}
`;
