import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';
import React from 'react';

import { TabNav } from './TabNav';

export interface TabListProps extends ReachTabListProps {}

export const TabList: React.FC<TabListProps> = (props) => {
  return <ReachTabList as={TabNav} {...props} />;
};
