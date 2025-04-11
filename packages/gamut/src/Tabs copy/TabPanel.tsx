import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  TabPanel as ReachTabPanel,
  TabPanelProps as ReachTabPanelProps,
} from '@reach/tabs';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelProps
  extends ReachTabPanelProps,
    StyleProps<typeof tabElementBaseProps>,
    TabElementStyleProps {}

export const TabPanel = styled(
  ReachTabPanel,
  styledOptions
)(tabElementBaseProps);
