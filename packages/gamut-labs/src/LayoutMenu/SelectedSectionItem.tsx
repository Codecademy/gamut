import { Box, Text } from '@codecademy/gamut';
import React from 'react';

export const SelectedSectionItem: React.FC = ({ children }) => {
  return (
    <Box borderLeft={1} borderWidthLeft="6px" pl={12}>
      <Text fontWeight="title" width="fit-content">
        {children}
      </Text>
    </Box>
  );
};
