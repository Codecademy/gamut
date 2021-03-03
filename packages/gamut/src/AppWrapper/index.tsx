import styled from '@emotion/styled';

import { Box } from '../Box';

// Ensure that positioning and index stay constant even if configured

export const AppWrapper = styled(Box)`
  position: relative;
  z-index: 1;
`;
