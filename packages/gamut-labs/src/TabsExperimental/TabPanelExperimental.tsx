import { Box } from '@codecademy/gamut';
import React from 'react';

import { DerivedPanelProps, TabPanelProps } from './types';

export const TabPanelExperimental: React.FC<TabPanelProps> = () => null;

export const DerivedTabPanel: React.FC<DerivedPanelProps> = ({
  children,
  className,
  isActiveTab,
  listItemMT,
  title,
}) => (
  <Box role="tabpanel" hidden={!isActiveTab} className={className}>
    {React.Children.toArray(children).map((child, i) => (
      <Box key={`${title}-${i}`} mt={listItemMT}>
        {child}
      </Box>
    ))}
  </Box>
);
