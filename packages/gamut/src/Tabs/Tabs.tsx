import styled from '@emotion/styled';
import { Tabs as ReachTabs, TabsProps as ReachTabsProps } from '@reach/tabs';
import React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';

// Prevent dev-only errors due to excluding react-ui default styles
if (process.env.NODE_ENV !== 'production' && document?.documentElement) {
  document.documentElement.style.setProperty('--reach-tabs', '1');
}
export interface TabsProps
  extends TabElementStyleProps,
    Omit<ReachTabsProps, 'orientation'> {}

const TabsBase = styled('div')<TabElementStyleProps>(tabElementBaseProps);

export const Tabs: React.FC<TabsProps> = (props) => {
  return <ReachTabs as={TabsBase} position="relative" zIndex={0} {...props} />;
};
