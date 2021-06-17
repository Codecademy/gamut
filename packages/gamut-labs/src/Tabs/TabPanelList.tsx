import React, { ReactElement } from 'react';

import { TabPanel } from './TabPanel';
import { TabPanelListProps, TabPanelProps } from './types';

export const TabPanelList: React.FC<TabPanelListProps> = ({
  children,
  activeTabIndex,
}) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <>
      {childArray
        .filter((c) => c.type === TabPanel)
        .map((Panel, i) => {
          const cloneProps: Partial<TabPanelProps> = {
            isActiveTab: i === activeTabIndex,
          };
          return React.cloneElement(Panel, cloneProps);
        })}
    </>
  );
};
