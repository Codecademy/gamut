import { Box } from '@codecademy/gamut';
import * as React from 'react';

import { DerivedPanelProps, TabPanelProps } from './types';

export const TabPanelExperimental: React.FC<TabPanelProps> = () => null;

export const DerivedTabPanel: React.FC<DerivedPanelProps> = ({
  children,
  className,
  isActiveTab,
}) => (
  <Box role="tabpanel" hidden={!isActiveTab} className={className}>
    {children}
  </Box>
);
