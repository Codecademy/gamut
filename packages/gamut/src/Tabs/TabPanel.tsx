import styled from '@emotion/styled';
import {
  TabPanel as ReachTabPanel,
  TabPanelProps as ReachTabPanelProps,
} from '@reach/tabs';
import React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from '../props';

export interface TabPanelProps
  extends ReachTabPanelProps,
    TabElementStyleProps {}

const TabPanelBase = styled('div')<TabElementStyleProps>(tabElementBaseProps);

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  return <ReachTabPanel as={TabPanelBase} {...props} />;
};
