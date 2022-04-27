import { styledOptions, useCurrentMode } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
} from '@reach/tabs';
import React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabsBaseVariants } from './styles';
import { TabProvider } from './TabProvider';

// Prevent dev-only errors due to excluding react-ui default styles
if (process.env.NODE_ENV !== 'production' && typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--reach-tabs', '1');
}

export interface TabsBaseProps
  extends StyleProps<typeof tabsBaseVariants>,
    TabElementStyleProps {}

export interface TabsProps
  extends TabsBaseProps,
    Omit<ReachTabsProps, 'orientation' | 'keyboardActivation'> {}

const TabsBase = styled('div', styledOptions)<TabsBaseProps>(
  tabElementBaseProps,
  tabsBaseVariants
);

export const Tabs: React.FC<TabsProps> = (props) => {
  const currentMode = useCurrentMode();
  return (
    <TabProvider value={{ variant: props.variant || 'standard' }}>
      <ReachTabs
        as={TabsBase}
        position="relative"
        zIndex={0}
        keyboardActivation={TabsKeyboardActivation.Manual}
        {...props}
      />
    </TabProvider>
  );
};
