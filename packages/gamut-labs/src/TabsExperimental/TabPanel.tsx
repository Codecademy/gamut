import { Box } from '@codecademy/gamut';
import React, { useContext } from 'react';

import { ActiveTabContext } from './context';
import { DerivedPanelProps, TabPanelProps } from './types';

export const TabPanel: React.FC<TabPanelProps> = () => null;

export const DerivedTabPanel: React.FC<DerivedPanelProps> = ({
  children,
  index,
  className,
}) => {
  const activeTabIndex = useContext(ActiveTabContext);
  return (
    <Box
      role="tabpanel"
      hidden={!(index === activeTabIndex)}
      className={className}
    >
      {children}
    </Box>
  );
};
