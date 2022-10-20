import * as React from 'react';

import { DerivedTabPanel } from './TabPanelExperimental';
import { TabPanelListProps } from './types';
import { isTabPanelGuard } from './utils';

export const TabPanelList: React.FC<TabPanelListProps> = ({
  children,
  activeTabIndex,
}) => (
  <>
    {React.Children.toArray(children)
      .filter(isTabPanelGuard)
      .map((panelChild, i) => {
        const { children: panelChildren, className, title } = panelChild.props;

        return (
          <DerivedTabPanel
            isActiveTab={i === activeTabIndex}
            className={className}
            key={`panel-${title}`}
          >
            {panelChildren}
          </DerivedTabPanel>
        );
      })}
  </>
);
