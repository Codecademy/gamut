import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerStyles } from './styles';

export interface TabListProps
  extends ReachTabListProps,
    StyleProps<typeof tabContainerStyles>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

export const TabList = styled(ReachTabList, styledOptions)<TabListProps>(
  tabElementBaseProps,
  tabContainerStyles,
  tabContainerStates
);
