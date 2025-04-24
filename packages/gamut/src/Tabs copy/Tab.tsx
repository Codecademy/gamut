import { useTab } from '@react-aria/tabs';
import * as React from 'react';

import { TabButton, TabButtonProps } from './TabButton';
import { useTabShared } from './TabProvider';

type Item = {
  key: string;
};

export type TabProps = React.PropsWithChildren &
  TabButtonProps & {
    item: Item;
  };

export const Tab: React.FC<TabProps> = ({ item, ...rest }) => {
  const ref = React.useRef(null);
  const { variant, state } = useTabShared();
  const { tabProps } = useTab({ key: item.key }, state, ref);

  return <TabButton {...tabProps} {...rest} variant={variant} ref={ref} />;
};
