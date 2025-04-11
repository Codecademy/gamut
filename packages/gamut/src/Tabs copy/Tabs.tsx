import { Background, styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
} from '@reach/tabs';
import * as React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerVariants } from './styles';
import { TabProvider } from './TabProvider';

// Prevent dev-only errors due to excluding react-ui default styles
if (process.env.NODE_ENV !== 'production' && typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--reach-tabs', '1');
}

export interface TabsBaseProps
  extends StyleProps<typeof tabContainerVariants>,
    TabElementStyleProps {}

export interface TabsProps
  extends TabsBaseProps,
    Omit<ReachTabsProps, 'orientation' | 'keyboardActivation'> {}

const TabsBase = styled(
  'div',
  styledOptions
)<TabsBaseProps>(tabElementBaseProps);

export const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <TabProvider value={{ variant: props.variant || 'standard' }}>
      {/* currently only supporting dark mode for the LE variant */}
      {props.variant === 'block' ? (
        <Background bg="navy-800" height="100%">
          <ReachTabs
            as={TabsBase}
            position="relative"
            zIndex={0}
            keyboardActivation={TabsKeyboardActivation.Manual}
            {...props}
          />
        </Background>
      ) : (
        <ReachTabs
          as={TabsBase}
          position="relative"
          zIndex={0}
          keyboardActivation={TabsKeyboardActivation.Manual}
          {...props}
        />
      )}
    </TabProvider>
  );
};
