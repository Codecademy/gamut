import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';
import {
  TabList as ReactAriaTabList,
  TabListProps as ReactAriaTabListProps,
  TabProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';
import { useTabShared } from './TabProvider';

export interface TabListProps
  extends ReactAriaTabListProps<TabProps>,
    StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

const TabListBase = styled(ReactAriaTabList)<TabListProps>(
  tabContainerVariants,
  tabContainerStates,
  tabElementBaseProps
);

export const TabList: React.FC<TabListProps> = (props) => {
  const { variant } = useTabShared();
  return <TabListBase {...props} variant={variant} />;
};
