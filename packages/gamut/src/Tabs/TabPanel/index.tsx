import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  TabPanel as ReachTabPanel,
  TabPanelProps as ReachTabPanelProps,
} from '@reach/tabs';

export interface TabPanelProps
  extends ReachTabPanelProps,
    StyleProps<typeof tabPanelProps> {}

const tabPanelProps = variance.compose(system.layout, system.space);

export const TabPanel = styled(ReachTabPanel)<TabPanelProps>(tabPanelProps);
