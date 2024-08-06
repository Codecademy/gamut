import * as React from 'react';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { Card, GridBox } from '@codecademy/gamut/src';

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
      <Card
        p={0}
        width="100%"
        borderRadius="m"
        display="grid"
        minHeight="3rem"
        gridAutoFlow="column"
        overflow="hidden"
      >
        {weights.map(([key, hex]) => (
          <Color key={`color-${key}`} bg={hex} />
        ))}
      </Card>
      <GridBox width="100%" p={4} gridAutoFlow="column">
        {weights.map(([key, hex]) => (
          <GridBox
            key={`hex-${key}`}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            textColor="gray-700"
          >
            {weights.length > 1 && <HexCode>{key}</HexCode>}
            <HexCode>{hex}</HexCode>
          </GridBox>
        ))}
      </GridBox>
    </>
  );
};
