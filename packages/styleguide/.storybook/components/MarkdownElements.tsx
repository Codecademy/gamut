import React from 'react';
import { css, styled, useTheme } from '@storybook/theming';
import { allProps } from './styles';
import { boxShadows } from '@codecademy/gamut-styles';

export const Box = styled.div(allProps);

export const Code = styled.code(
  (props) => css`
    font-family: ${props.theme.fontCode};
    max-width: 100%;
    overflow-x: scroll;
    line-height: 1;
    padding: 3px 5px;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 13px;
    border: 1px solid #eeeeee;
    color: rgba(51, 51, 51, 0.8);
    background-color: #f8f8f8;
    display: inline-block;
  `
);

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
          <Box backgroundColor={hex} />
        ))}
      </Box>
      <Box width="100%" padding="4px" display="grid" gridAutoFlow="column">
        {weights.map(([key, hex]) => (
          <Box
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
