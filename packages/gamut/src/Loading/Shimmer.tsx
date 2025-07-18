import { useCurrentMode } from '@codecademy/gamut-styles';
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

const lightModeForegroundBg = `
  to right,
  rgba(0, 0, 0, 0) 20%,
  rgba(0, 0, 0, 0.2) 50%,
  rgba(0, 0, 0, 0) 80%
`;

const darkModeForegroundBg = `
  to right,
  rgba(255, 255, 255, 0) 20%,
  rgba(255, 255, 255, 0.2) 50%,
  rgba(255, 255, 255, 0) 80%
`;

const ShimmerForeground = styled(Box)<{
  foregroundBg: typeof lightModeForegroundBg | typeof darkModeForegroundBg;
}>`
  animation: ${slide} 2s linear infinite, ${fade} 1s linear infinite alternate;
  background: linear-gradient(${(props) => props.foregroundBg});
`;

export const Shimmer: React.FC<BoxProps> = (props) => {
  const currentMode = useCurrentMode();
  return (
    <Box {...props}>
      <Box
        bg="background-disabled"
        fit
        opacity={0.5}
        overflow="hidden"
        position="relative"
      >
        <ShimmerForeground
          foregroundBg={
            currentMode === 'light'
              ? lightModeForegroundBg
              : darkModeForegroundBg
          }
          height={1}
          position="absolute"
          width={500}
        />
      </Box>
    </Box>
  );
};
