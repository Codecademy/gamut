import { Box } from '@codecademy/gamut';
import React from 'react';

import { TabPanelProps } from './types';

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  className,
  isActiveTab,
}) => (
  <Box className={className} role="tabpanel" hidden={!isActiveTab}>
    {children}
  </Box>
);
