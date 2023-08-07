import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { Box, BoxProps } from '../Box';

const slide = keyframes({
  from: { left: -500 },
  to: { left: 500 },
});
const fade = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const ShimmerForeground = styled(Box)`
  animation: ${slide} 2s linear infinite, ${fade} 1s linear infinite alternate;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 80%
  );
`;

export const Shimmer: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <Box
        position="relative"
        fit
        bg="background-disabled"
        opacity={0.5}
        overflow="hidden"
      >
        <ShimmerForeground height={1} width={500} position="absolute" />
      </Box>
    </Box>
  );
};
