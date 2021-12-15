import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
} from '@reach/tabs';
import React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';

// Prevent dev-only errors due to excluding react-ui default styles
if (process.env.NODE_ENV !== 'production' && typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--reach-tabs', '1');
}

export interface TabsBaseProps extends TabElementStyleProps, ReachTabsProps {}

export interface TabsProps
  extends Omit<TabsBaseProps, 'orientation' | 'keyboardActivation'> {}

const TabsBase = styled(
  ReachTabs,
  styledOptions
)<TabsBaseProps>(tabElementBaseProps);

export const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <TabsBase
      position="relative"
      zIndex={0}
      keyboardActivation={TabsKeyboardActivation.Manual}
      {...props}
    />
  );
};
