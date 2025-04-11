import * as React from 'react';
import {
  Tab as ReactAriaTab,
  TabProps as ReactAriaTabProps,
} from 'react-aria-components';

import { TabButton, TabButtonProps } from './TabButton';
import { useTab } from './TabProvider';

export interface TabProps extends TabButtonProps, ReactAriaTabProps {}

export const Tab: React.FC<TabProps> = (props) => {
  const { variant } = useTab();

  return <ReactAriaTab {...props} as={TabButton} variant={variant} />;
};
