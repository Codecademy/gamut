import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const HeartContainer = styled.span`
  display: inline-block;
  filter: saturate(0.7);
  margin-right: 0.25rem;
  min-width: 1.75em;
`;

export const MadeIn = () => {
  return (
    <Box
      display={{ md: 'inline-block' }}
      textAlign={{ xs: 'center', md: 'right' }}
    >
      Made with
      <HeartContainer aria-label="love">️❤️</HeartContainer>
      in NYC ©{` ${new Date().getFullYear()} `} Codecademy
    </Box>
  );
};
