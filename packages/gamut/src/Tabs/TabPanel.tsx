import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import {
  TabPanel as ReactAriaTabPanel,
  TabPanelProps as ReactAriaTabPanelProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';

interface TabPanelBaseProps
  extends TabElementStyleProps,
    ReactAriaTabPanelProps {}

export type TabPanelProps = Omit<
  TabPanelBaseProps,
  'id' | 'shouldForceMount'
> & {
  /**
   * the id matches up the tab and tab panel
   */
  id: string;
  /**
   * Whether to mount the tab panel in the DOM even when it is not currently selected.
   * This is a wrapper around the `shouldForceMount` prop in react-aria-components that also visually hides the inactive tab panel.
   */
  shouldForceMount?: boolean;
};

const tabPanelStates = system.states({
  shouldForceMount: {
    "&[data-inert='true']": {
      display: 'none',
    },
  },
});

const StyledTabPanel = styled(ReactAriaTabPanel)<TabPanelProps>(
  tabElementBaseProps,
  tabPanelStates
);

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  return <StyledTabPanel {...props} />;
};
