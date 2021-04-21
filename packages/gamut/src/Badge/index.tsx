import React from 'react';

import { Box } from '../Box';

export const Badge: React.FC = ({ children }) => (
  <Box
    bg="blue"
    borderRadius="3px"
    textColor="white"
    display="inline-block"
    fontSize={14}
    mx={8}
    py={4}
    px={12}
  >
    {children}
  </Box>
);
