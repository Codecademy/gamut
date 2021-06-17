import React, { useEffect, useState } from 'react';

import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabsProps } from './types';

export const Tabs: React.FC<TabsProps> = ({ activeTabIndex = 0, children }) => {
  const [_activeTabIndex, setActiveTabIndex] = useState(activeTabIndex);

  useEffect(() => {
    setActiveTabIndex(activeTabIndex);
  }, [activeTabIndex]);

  return (
    <div>
      <TabList activeTabIndex={activeTabIndex} setActiveTab={setActiveTabIndex}>
        {children}
      </TabList>
    </div>
  );
};
