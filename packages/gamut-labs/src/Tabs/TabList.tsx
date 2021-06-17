import { Box } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { Tab } from './Tab';
import { TabPanel, TabPanelProps } from './TabPanel';
import { TabListProps } from './types';

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTab,
}) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <Box role="tablist">
      {childArray
        .filter((c) => c.type === TabPanel)
        .map((ChildTab, i) => {
          const { title, onTabClick } = ChildTab.props as TabPanelProps;
          const onClick = () => {
            onTabClick?.();
            setActiveTab(i);
          };
          return (
            <Tab
              title={title}
              isActiveTab={i === activeTabIndex}
              onClick={onClick}
            />
          );
        })}
    </Box>
  );
};
