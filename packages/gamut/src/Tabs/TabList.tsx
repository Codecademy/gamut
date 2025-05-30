import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';
import {
  TabList as ReactAriaTabList,
  TabListProps as ReactAriaTabListProps,
  TabProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';
import { useTab } from './TabProvider';

export interface TabListBaseProps
  extends StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

export interface TabListProps
  extends TabListBaseProps,
    ReactAriaTabListProps<TabProps> {}

const TabListBase = styled(ReactAriaTabList)<TabListProps>(
  tabContainerVariants,
  tabContainerStates,
  tabElementBaseProps
);

export const TabList: React.FC<TabListProps> = (props) => {
  const { variant } = useTab();
  return <TabListBase {...props} variant={variant} />;
};
