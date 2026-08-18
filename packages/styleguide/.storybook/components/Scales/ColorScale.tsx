import * as React from 'react';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { Box, GridBox } from '@codecademy/gamut';

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
        p={0}
        width="100%"
        borderRadius="md"
        display="grid"
        minHeight="3rem"
        gridAutoFlow="column"
        overflow="hidden"
        border={1}
      >
        {weights.map(([key, hex]) => (
          <Color key={`color-${key}`} bg={hex} />
        ))}
      </Box>
      <GridBox width="100%" p={4} gridAutoFlow="column">
        {weights.map(([key, hex]) => (
          <GridBox
            key={`hex-${key}`}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            textColor="text"
          >
            {weights.length > 1 && <HexCode>{key}</HexCode>}
            <HexCode>{hex}</HexCode>
          </GridBox>
        ))}
      </GridBox>
    </>
  );
};
