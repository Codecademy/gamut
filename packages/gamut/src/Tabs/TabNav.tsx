import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { tabElementBaseProps, TabElementStyleProps } from '../Tabs/props';
import { tabContainerStates, tabContainerStyles } from './styles';

export interface TabNavProps
  extends StyleProps<typeof tabContainerStyles>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

export const TabNav = styled('nav', styledOptions<'nav'>())<TabNavProps>(
  tabElementBaseProps,
  tabContainerStyles,
  tabContainerStates
);
