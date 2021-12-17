import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import React from 'react';

import { TabButton, TabButtonProps } from './TabButton';

export interface TabProps extends TabButtonProps, ReachTabProps {}

export const Tab: React.FC<TabProps> = (props) => {
  return <ReachTab {...props} as={TabButton} />;
};
