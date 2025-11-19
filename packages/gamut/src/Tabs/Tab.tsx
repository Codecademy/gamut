import styled from '@emotion/styled';
import * as React from 'react';
import {
  Tab as ReactAriaTab,
  TabProps as ReactAriaTabProps,
} from 'react-aria-components';

import { tabElementBaseProps } from './props';
import { TabButtonProps, tabStates, tabVariants } from './TabButton';
import { useTab } from './TabProvider';

interface TabBaseProps extends TabButtonProps, ReactAriaTabProps {}

export type TabProps = Omit<TabBaseProps, 'id'> & {
  /**
   * the id matches up the tab and tab panel
   */
  id: string;
};

const TabBase = styled(ReactAriaTab)<TabProps>(
  tabVariants,
  tabStates,
  tabElementBaseProps
);

export const Tab: React.FC<TabProps> = (props) => {
  const { variant } = useTab();

  return <TabBase {...props} variant={variant} />;
};
