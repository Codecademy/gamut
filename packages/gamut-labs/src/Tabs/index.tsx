import React, { ReactElement, useEffect, useState } from 'react';

import { Tab } from './Tab';
import { TabList } from './TabList';

type TabsProps = {
  activeTabIndex?: number;
  children: ReactElement<any, any>[];
  onChange: () => void;
  className?: string;
};

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
