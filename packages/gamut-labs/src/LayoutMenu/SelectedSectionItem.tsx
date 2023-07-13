import { Box, Text, WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';

export const SelectedSectionItem: React.FC<WithChildrenProp> = ({
  children,
}) => {
  return (
    <Box borderLeft={1} borderWidthLeft="6px" pl={12} aria-current="true">
      <Text fontWeight="title">{children}</Text>
    </Box>
  );
};
