import styled from '@emotion/styled';
import { Box } from '../Box';

export const Badge = styled(Box)``;

Badge.defaultProps = {
  backgroundColor: 'blue',
  borderRadius: '3px',
  textColor: 'white',
  display: 'inline-block',
  fontSize: 14,
  marginX: 8,
  paddingY: 4,
  paddingX: 12,
};
