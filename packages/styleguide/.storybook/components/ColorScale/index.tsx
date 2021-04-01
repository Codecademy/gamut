import React from 'react';
import { boxShadows } from '@codecademy/gamut-styles/src';
import { css, styled } from '@storybook/theming';
import { Box } from '../Box';

const HexCode = styled.span(
  (props) => css`
    font-family: ${props.theme.fontCode};
  `
);

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
          <Box key={`color-${key}`} backgroundColor={hex} />
        ))}
      </Box>
      <Box width="100%" padding="4px" display="grid" gridAutoFlow="column">
        {weights.map(([key, hex]) => (
          <Box
            key={`hex-${key}`}
            fontSize="12px"
            display="grid"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            textColor="rgba(51,51,51,0.5)"
          >
            {weights.length > 1 && <HexCode>{key}</HexCode>}
            <HexCode>{hex}</HexCode>
          </Box>
        ))}
      </Box>
    </>
  );
};
