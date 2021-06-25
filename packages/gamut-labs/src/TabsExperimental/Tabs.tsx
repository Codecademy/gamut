import { FlexBox } from '@codecademy/gamut';
import React, { useState } from 'react';

import { ActiveTabContext } from './context';
import { TabList } from './TabList';
import { TabPanelList } from './TabPanelList';
import { TabsProps } from './types';

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [_activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <ActiveTabContext.Provider value={_activeTabIndex}>
      <FlexBox flexDirection="column">
        <TabList
          activeTabIndex={_activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        >
          {children}
        </TabList>
        <TabPanelList>{children}</TabPanelList>
      </FlexBox>
    </ActiveTabContext.Provider>
  );
};
