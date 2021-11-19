import styled from '@emotion/styled';
import {
  TabPanels as ReachTabPanels,
  TabPanelsProps as ReachTabPanelsProps,
} from '@reach/tabs';

export interface TabPanelsProps extends ReachTabPanelsProps {}

export const TabPanels = styled(ReachTabPanels)<TabPanelsProps>();
