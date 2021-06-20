import { FlexBox } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabListProps, TabPanelProps } from './types';

type DerivedTabProps = Pick<
  TabPanelProps,
  'title' | 'onTabClick' | 'tabDisabled'
> & {
  index: number;
  setActiveTabIndex: (index: number) => void;
  activeTabIndex: number;
};

const DerivedTab: React.FC<DerivedTabProps> = ({
  title,
  onTabClick,
  tabDisabled,
  index,
  activeTabIndex,
  setActiveTabIndex,
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
    />
  );
};

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTabIndex,
}) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <FlexBox role="tablist">
      {childArray.reduce((pannelArray: typeof childArray, currentChild, i) => {
        if (currentChild.type !== TabPanel) {
          return pannelArray;
        }
        return pannelArray.push(
          <DerivedTab
            {...(currentChild.props as TabPanelProps)}
            index={i}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
          />
        );
      }, [])}
    </FlexBox>
  );
};
