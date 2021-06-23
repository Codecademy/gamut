import { FlexBox } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { DerivedTabProps, TabListProps, TabPanelProps } from './types';

const DerivedTab: React.FC<DerivedTabProps> = ({
  title,
  onTabClick,
  tabDisabled,
  index,
  activeTabIndex,
  setActiveTabIndex,
  tabSize,
  activeTabColor,
}) => {
  const onClick = () => {
    onTabClick?.();
    setActiveTabIndex(index);
  };
  return (
    <Tab
      title={title}
      isActiveTab={index === activeTabIndex}
      onClick={onClick}
      disabled={Boolean(tabDisabled)}
      tabSize={tabSize}
      activeTabColor={activeTabColor}
    />
  );
};

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTabIndex,
  tabSize,
  activeTabColor,
}) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <FlexBox role="tablist">
      {childArray.reduce((pannelArray: typeof childArray, currentChild, i) => {
        if (currentChild.type === TabPanel) {
          const panelProps = currentChild.props as TabPanelProps;
          pannelArray.push(
            <DerivedTab
              {...panelProps}
              index={i}
              activeTabIndex={activeTabIndex}
              setActiveTabIndex={setActiveTabIndex}
              key={`tab-${panelProps.title}`}
              tabSize={tabSize}
              activeTabColor={activeTabColor}
            />
          );
        }
        return pannelArray;
      }, [])}
    </FlexBox>
  );
};
