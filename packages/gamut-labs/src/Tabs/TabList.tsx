import { FlexBox } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabListProps, TabPanelProps } from './types';

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTab,
}) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <FlexBox role="tablist">
      {childArray
        .filter((c) => c.type === TabPanel)
        .map((ChildTab, i) => {
          const {
            title,
            onTabClick,
            tabDisabled,
          } = ChildTab.props as TabPanelProps;
          const onClick = () => {
            onTabClick?.();
            setActiveTab(i);
          };
          return (
            <Tab
              title={title}
              isActiveTab={i === activeTabIndex}
              onClick={onClick}
              disabled={Boolean(tabDisabled)}
            />
          );
        })}
    </FlexBox>
  );
};
