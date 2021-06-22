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
    />
  );
};

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTabIndex,
  tabSize,
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
              key={panelProps.title}
              tabSize={tabSize}
            />
          );
        }
        return pannelArray;
      }, [])}
    </FlexBox>
  );
};
