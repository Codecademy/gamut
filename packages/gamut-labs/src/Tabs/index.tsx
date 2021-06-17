import { FlexBox } from '@codecademy/gamut';
import React, { useEffect, useState } from 'react';

import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanelList } from './TabPanelList';
import { TabsProps } from './types';

export const Tabs: React.FC<TabsProps> = ({ activeTabIndex = 0, children }) => {
  const [_activeTabIndex, setActiveTabIndex] = useState(activeTabIndex);

  useEffect(() => {
    setActiveTabIndex(activeTabIndex);
  }, [activeTabIndex]);

  return (
    <FlexBox flexDirection="column">
      <TabList
        activeTabIndex={_activeTabIndex}
        setActiveTab={setActiveTabIndex}
      >
        {children}
      </TabList>
      <TabPanelList activeTabIndex={_activeTabIndex}>{children}</TabPanelList>
    </FlexBox>
  );
};
