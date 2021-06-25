import { FlexBox } from '@codecademy/gamut';
import React, { useState } from 'react';

import { TabList } from './TabList';
import { TabPanelList } from './TabPanelList';
import { TabsProps } from './types';

export const TabsExperimental: React.FC<TabsProps> = ({
  children,
  className,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <FlexBox flexDirection="column" className={className}>
      <TabList
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      >
        {children}
      </TabList>
      <TabPanelList activeTabIndex={activeTabIndex}>{children}</TabPanelList>
    </FlexBox>
  );
};
