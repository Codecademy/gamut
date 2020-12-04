import { grid } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { Box } from './Box';

export const GridBox = styled(Box)(grid);

GridBox.defaultProps = {
  display: 'grid',
};
