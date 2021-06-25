import React, { ReactElement } from 'react';

import { DerivedTabPanel, TabPanel } from './TabPanel';
import { TabPanelListProps, TabPanelProps } from './types';

export const TabPanelList: React.FC<TabPanelListProps> = ({ children }) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  return (
    <>
      {childArray.reduce((pannelArray: typeof childArray, currentChild, i) => {
        if (currentChild.type === TabPanel) {
          const {
            children: panelChildren,
            className,
            title,
          } = currentChild.props as TabPanelProps;
          pannelArray.push(
            <DerivedTabPanel
              index={i}
              className={className}
              key={`panel-${title}`}
            >
              {panelChildren}
            </DerivedTabPanel>
          );
        }
        return pannelArray;
      }, [])}
    </>
  );
};
