import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { Box, BoxProps } from '../Box';

const shimmer = keyframes`0% { left: -500px; opacity: 0; } 50% { left: 0px; opacity: 1; } 100% { left: 500px; opacity: 0; }`;

const ShimmerForeground = styled.div`
  position: 'absolute';
  height: 1;
  width: 500;
  animation: ${shimmer} 2s infinite linear;
  background: 'linear-gradient(to right, rgba(0,0,0,0) 20%, rgb(0,0,0, 0.2) 50%, rgb(0,0,0, 0) 80%)';
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
        <ShimmerForeground />
      </Box>
    </Box>
  );
};
