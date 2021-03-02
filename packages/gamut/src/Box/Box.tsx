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
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

const boxStyles = compose(
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

export type BoxStyles = HandlerProps<typeof boxStyles>;
export interface BoxProps extends BoxStyles {}

export const Box = styled('div', {
  shouldForwardProp,
})<BoxProps>(boxStyles);
