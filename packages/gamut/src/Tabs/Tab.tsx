import { useTabsContext } from '@reach/tabs';
import React from 'react';

import { TabNavButton } from '../TabNav';
import { TabElementStyleProps } from './props';

export interface TabProps extends TabElementStyleProps {
  index: number;
}

export const Tab: React.FC<TabProps> = (props) => {
  const { index } = props;
  const { selectedIndex } = useTabsContext();
  console.log(selectedIndex, index);
  return <TabNavButton selected={index === selectedIndex} {...props} />;
};
