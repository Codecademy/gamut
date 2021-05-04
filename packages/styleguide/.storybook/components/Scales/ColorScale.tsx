import React from 'react';
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
      <Card p={0} width={1} borderRadius="4px" minHeight="3rem">
        <GridBox flow="column">
          {weights.map(([key, hex]) => (
            <Color key={`color-${key}`} bg={hex} />
          ))}
        </GridBox>
      </Card>
      <GridBox width={1} p={4} flow="column" textColor="gray-700">
        {weights.map(([key, hex]) => (
          <GridBox key={`hex-${key}`} alignAll="center">
            {weights.length > 1 && <HexCode>{key}</HexCode>}
            <HexCode>{hex}</HexCode>
          </GridBox>
        ))}
      </GridBox>
    </>
  );
};
