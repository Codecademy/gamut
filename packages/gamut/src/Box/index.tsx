import {
  space,
  layout,
  border,
  color,
  grid,
  flex,
  shadow,
  positioning,
  background,
  typography,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

const boxStyles = compose(
  space,
  layout,
  border,
  color,
  grid,
  flex,
  shadow,
  positioning,
  background,
  typography
);

export type BoxProps = HandlerProps<typeof boxStyles>;

export const Box = styled.div<BoxProps>(boxStyles);

export const FlexBox = styled(Box)``;

FlexBox.defaultProps = {
  display: 'flex',
};

export const GridBox = styled(Box)``;

GridBox.defaultProps = {
  display: 'grid',
};
