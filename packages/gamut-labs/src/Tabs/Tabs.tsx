import { FlexBox } from '@codecademy/gamut';
import React, { useEffect, useRef, useState } from 'react';

import { ActiveTabContext } from './context';
import { TabList } from './TabList';
import { TabPanelList } from './TabPanelList';
import { TabsProps } from './types';

export const Tabs: React.FC<TabsProps> = ({
  activeTabIndex = 0,
  children,
  onChange,
}) => {
  const initializedRef = useRef({ onChange: false });
  const [_activeTabIndex, setActiveTabIndex] = useState(activeTabIndex);

  useEffect(() => {
    setActiveTabIndex(activeTabIndex);
  }, [activeTabIndex]);

  useEffect(() => {
    if (initializedRef.current.onChange) {
      onChange?.();
    } else {
      initializedRef.current.onChange = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_activeTabIndex]);

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
