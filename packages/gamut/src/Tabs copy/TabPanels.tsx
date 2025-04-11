import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import {
  TabPanels as ReachTabPanels,
  TabPanelsProps as ReachTabPanelsProps,
} from '@reach/tabs';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelsProps
  extends ReachTabPanelsProps,
    TabElementStyleProps {}

export const TabPanels = styled(
  ReachTabPanels,
  styledOptions
)<TabPanelsProps>(tabElementBaseProps);
