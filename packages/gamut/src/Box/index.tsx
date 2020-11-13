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
  shadow,
  positioning,
  background,
  typography
);

export interface BoxProps extends HandlerProps<typeof boxStyles> {}

export const Box = styled.div<BoxProps>(boxStyles);

const flexStyles = compose(flex);
export interface FlexProps extends HandlerProps<typeof flexStyles> {}

export const FlexBox = styled(Box)<HandlerProps<typeof flexStyles>>(flexStyles);

FlexBox.defaultProps = {
  display: 'flex',
};

const gridStyles = compose(grid);
export interface GridProps extends HandlerProps<typeof gridStyles> {}

export const GridBox = styled(Box)<GridProps>(gridStyles);

GridBox.defaultProps = {
  display: 'grid',
};
