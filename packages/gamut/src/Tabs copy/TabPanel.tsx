import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import {
  TabPanel as ReactAriaTabPanel,
  TabPanelProps as ReactAriaTabPanelProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelProps
  extends ReactAriaTabPanelProps,
    TabElementStyleProps {}

export const TabPanel = styled(
  ReactAriaTabPanel,
  styledOptions
)(tabElementBaseProps);
