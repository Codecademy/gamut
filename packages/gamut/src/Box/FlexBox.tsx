import styled from '@emotion/styled';
import { Box, BoxProps } from './Box';

export const FlexBox = styled(Box)<BoxProps>();

FlexBox.defaultProps = {
  display: 'flex',
} as BoxProps;
