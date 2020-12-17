import React from 'react';

import { Box } from '../Box';

export const Badge: React.FC = ({ children }) => (
  <Box
    backgroundColor="blue"
    borderRadius="3px"
    textColor="white"
    display="inline-block"
    fontSize={14}
    marginX={8}
    paddingY={4}
    paddingX={12}
  >
    {children}
  </Box>
);
