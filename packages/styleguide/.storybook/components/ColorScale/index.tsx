import React from 'react';
import { useTheme } from '@storybook/theming';
import { boxShadows } from '@codecademy/gamut-styles';
import { Box } from '../Box';

export const ColorScale: React.FC<{ colors: Record<string, string> }> = ({
  colors,
}) => {
  const { fontCode } = useTheme();
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
            fontFamily={fontCode}
            fontSize="12px"
            display="grid"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            textColor="rgba(51,51,51,0.5)"
          >
            {weights.length > 1 && <span>{key}</span>}
            <span>{hex}</span>
          </Box>
        ))}
      </Box>
    </>
  );
};
