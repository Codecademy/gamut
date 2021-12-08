import { Tab as ReachTab } from '@reach/tabs';
import React from 'react';

import { TabElementStyleProps } from './props';
import { TabNavButton } from './TabNavButton';

export interface TabProps extends TabElementStyleProps {
  index: number;
}

export const Tab: React.FC<TabProps> = (props) => {
  return <ReachTab as={TabNavButton} {...props} />;
};
