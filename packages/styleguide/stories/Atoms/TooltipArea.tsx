import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const AreaBox = styled(Box)`
  margin: 2rem 10rem;
`;

export const TooltipArea: React.FC = ({ children }) => {
  return (
    <AreaBox as="span" display="inline-block" minHeight="5rem">
      {children}
    </AreaBox>
  );
};
