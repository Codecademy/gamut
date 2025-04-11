import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';
import {
  TabList as ReactAriaTabList,
  TabListProps as ReactAriaTabListProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';
import { useTab } from './TabProvider';

export interface TabListProps
  extends ReactAriaTabListProps,
    StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

const TabListBase = styled('div', styledOptions)<TabListProps>(
  tabContainerVariants,
  tabContainerStates,
  tabElementBaseProps
);

export const TabList: React.FC<TabListProps> = (props) => {
  const { variant } = useTab();
  return <ReactAriaTabList {...props} variant={variant} as={TabListBase} />;
};
