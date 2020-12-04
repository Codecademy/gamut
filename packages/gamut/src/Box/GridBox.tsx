import { grid } from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import { boxStyles } from './Box';

const gridBoxStyles = compose(boxStyles, grid);

type GridStyles = HandlerProps<typeof gridBoxStyles>;

export interface GridBoxProps extends GridStyles {}

export const GridBox = styled.div<GridBoxProps>(gridBoxStyles);

GridBox.defaultProps = {
  display: 'grid',
};
