import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import React from 'react';

import { TabButton } from './TabButton';

export interface TabProps
  extends React.ComponentPropsWithRef<typeof TabButton>,
    ReachTabProps {}

export const Tab: React.FC<TabProps> = (props) => {
  return <ReachTab as={TabButton} {...props} />;
};
