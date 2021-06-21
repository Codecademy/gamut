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
      {childArray.reduce((pannelArray: typeof childArray, currentChild, i) => {
        if (currentChild.type === TabPanel) {
          const cloneProps: Partial<TabPanelProps> = {
            isActiveTab: i === activeTabIndex,
          };
          pannelArray.push(React.cloneElement(currentChild, cloneProps));
        }
        return pannelArray;
      }, [])}
    </>
  );
};
