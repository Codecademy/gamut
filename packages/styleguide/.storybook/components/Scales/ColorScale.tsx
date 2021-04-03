import React from 'react';
import { boxShadows, themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { Box } from '@codecademy/gamut/src';

const HexCode = styled.span`
  font-family: ${themed('fontFamily.monospace')};
  font-size: 12px;
`;

const Color = styled.div<{ bg?: string }>(({ bg }) => ({
  backgroundColor: bg,
}));

export const ColorScale: React.FC<{ colors: Record<string, string> }> = ({
  colors,
}) => {
  const weights = Object.entries(colors);

  return (
    <>
      <Box
        width="100%"
        borderRadius="4px"
        display="grid"
        minHeight="3rem"
        gridAutoFlow="column"
        overflow="hidden"
        boxShadow={boxShadows[1]}
      >
        {weights.map(([key, hex]) => (
          <Color key={`color-${key}`} bg={hex} />
        ))}
      </Box>
      <Box width="100%" padding={4} display="grid" gridAutoFlow="column">
        {weights.map(([key, hex]) => (
          <Box
            key={`hex-${key}`}
            display="grid"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            textColor="gray-400"
          >
            {weights.length > 1 && <HexCode>{key}</HexCode>}
            <HexCode>{hex}</HexCode>
          </Box>
        ))}
      </Box>
    </>
  );
};
