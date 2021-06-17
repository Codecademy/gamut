import { Box } from '@codecademy/gamut';
import React from 'react';

export type TabPanelProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  isActiveTab?: boolean;
  onTabClick?: () => void;
};

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  className,
  isActiveTab,
}) => (
  <Box className={className} role="tabpanel" hidden={!isActiveTab}>
    {children}
  </Box>
);
