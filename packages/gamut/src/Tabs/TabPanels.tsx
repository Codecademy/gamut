import styled from '@emotion/styled';
import {
  TabPanels as ReachTabPanels,
  TabPanelsProps as ReachTabPanelsProps,
} from '@reach/tabs';
import React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelsProps
  extends ReachTabPanelsProps,
    TabElementStyleProps {}

const TabPanelsBase = styled('div')<TabElementStyleProps>(tabElementBaseProps);

export const TabPanels: React.FC<TabPanelsProps> = (props) => {
  return <ReachTabPanels as={TabPanelsBase} {...props} />;
};
