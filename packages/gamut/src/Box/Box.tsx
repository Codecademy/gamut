import {
  background,
  border,
  color,
  flex,
  grid,
  layout,
  positioning,
  shadow,
  shouldForwardProp,
  space,
  typography,
} from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const boxStyles = variance.compose(
  space,
  layout,
  border,
  color,
  shadow,
  positioning,
  background,
  typography,
  flex,
  grid
);

export type BoxStyles = Parameters<typeof boxStyles>[0];
export interface BoxProps extends BoxStyles {}

export const Box = styled('div', {
  shouldForwardProp,
})<BoxProps>(boxStyles);
