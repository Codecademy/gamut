import { FlexBox } from '@codecademy/gamut';
import * as React from 'react';

import { Tab } from './Tab';
import { TabListProps } from './types';
import { isTabPanelGuard } from './utils';

export const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex,
  setActiveTabIndex,
}) => (
  <FlexBox role="tablist">
    {React.Children.toArray(children)
      .filter(isTabPanelGuard)
      .map((panelChild, i) => {
        const { title } = panelChild.props;
        return (
          <Tab
            title={title}
            isActiveTab={i === activeTabIndex}
            onClick={() => setActiveTabIndex(i)}
            key={`tab-${title}`}
          />
        );
      })}
  </FlexBox>
);
