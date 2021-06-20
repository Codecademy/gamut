import { FlexBox } from '@codecademy/gamut';
import React, { useEffect, useRef, useState } from 'react';

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
  }, [_activeTabIndex, onChange]);

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
