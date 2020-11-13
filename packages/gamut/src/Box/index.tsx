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

// This is a work around for flex props not being assignable to an interface.
const flexStyles = compose(flex);
export interface FlexProps extends HandlerProps<typeof flexStyles> {}

export const FlexBox = styled(Box)<FlexProps>(flexStyles);

FlexBox.defaultProps = {
  display: 'flex',
};

const gridStyles = compose(grid);
export interface GridProps extends HandlerProps<typeof gridStyles> {}

export const GridBox = styled(Box)<GridProps>(gridStyles);

GridBox.defaultProps = {
  display: 'grid',
};
