import styled from '@emotion/styled';
import { AriaTabPanelProps, useTabPanel } from '@react-aria/tabs';
import React from 'react';

import { Box } from '../Box';
import { tabElementBaseProps, TabElementStyleProps } from './props';
import { useTabShared } from './TabProvider';

export const TabPanelBase =
  styled(Box)<TabElementStyleProps>(tabElementBaseProps);

export type TabPanelProps = React.PropsWithChildren &
  TabElementStyleProps & {
    props: AriaTabPanelProps;
  };

export const TabPanel: React.FC<TabPanelProps> = ({ props, ...rest }) => {
  const ref = React.useRef(null);
  const { state } = useTabShared();
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return <TabPanelBase {...tabPanelProps} {...rest} ref={ref} />;
};
