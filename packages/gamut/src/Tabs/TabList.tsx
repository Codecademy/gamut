import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';
import * as React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';
import { useTab } from './TabProvider';

export interface TabListProps
  extends ReachTabListProps,
    StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

const TabListBase = styled('div', styledOptions)<TabListProps>(
  tabContainerVariants,
  tabContainerStates,
  tabElementBaseProps
);

export const TabList: React.FC<TabListProps> = (props) => {
  const { variant } = useTab();
  return <ReachTabList {...props} as={TabListBase} variant={variant} />;
};
