import { FlexBox } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabListProps, TabPanelProps } from './types';

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTabIndex,
}) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <FlexBox role="tablist">
      {childArray.reduce((pannelArray: typeof childArray, currentChild, i) => {
        if (currentChild.type === TabPanel) {
          const panelProps = currentChild.props as TabPanelProps;
          pannelArray.push(
            <Tab
              title={panelProps.title}
              isActiveTab={i === activeTabIndex}
              onClick={() => setActiveTabIndex(i)}
              key={`tab-${panelProps.title}`}
            />
          );
        }
        return pannelArray;
      }, [])}
    </FlexBox>
  );
};
