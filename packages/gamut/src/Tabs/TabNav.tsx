import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { tabElementBaseProps, TabElementStyleProps } from '../Tabs/props';
import { tabContainerStyles } from './styles';

export interface TabNavProps
  extends StyleProps<typeof tabContainerStyles>,
    TabElementStyleProps {}

export const TabNav = styled('nav')<TabNavProps>(
  tabElementBaseProps,
  tabContainerStyles
);
