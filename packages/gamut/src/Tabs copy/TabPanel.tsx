import styled from '@emotion/styled';
import {
  TabPanel as ReactAriaTabPanel,
  TabPanelProps as ReactAriaTabPanelProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';

interface TabPanelBaseProps
  extends TabElementStyleProps,
    ReactAriaTabPanelProps {}

export type TabPanelProps = TabPanelBaseProps &
  Omit<ReactAriaTabPanelProps, 'id'> & {
    /**
     * the id matches up the tab and tab panel
     */
    id: string;
  };

export const TabPanel =
  styled(ReactAriaTabPanel)<TabPanelProps>(tabElementBaseProps);
