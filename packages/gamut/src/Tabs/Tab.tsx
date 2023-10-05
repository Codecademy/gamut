import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import * as React from 'react';

import { TabButton, TabButtonProps } from './TabButton';
import { useTab } from './TabProvider';

export interface TabProps extends TabButtonProps, ReachTabProps {}

export const Tab: React.FC<TabProps> = (props) => {
  const { variant } = useTab();

  return <ReachTab {...props} as={TabButton} variant={variant} />;
};
