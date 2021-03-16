import { styled } from '@codecademy/gamut-styles';

import { Box, BoxProps } from './Box';

export const GridBox = styled(Box)<BoxProps>();

GridBox.defaultProps = {
  display: 'grid',
} as BoxProps;
