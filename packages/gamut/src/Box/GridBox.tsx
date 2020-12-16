import styled from '@emotion/styled';

import { Box, BoxProps } from './Box';

export const GridBox = styled(Box)<BoxProps>();

GridBox.defaultProps = {
  display: 'grid',
} as BoxProps;
