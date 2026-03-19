import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import type { ComponentType } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';

export interface TabNavProps
  extends StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps,
    ComponentPropsWithoutRef<'nav'> {}

const StyledTabNav = styled('nav', styledOptions<'nav'>())<TabNavProps>(
  tabElementBaseProps,
  tabContainerVariants,
  tabContainerStates
);

export const TabNav = StyledTabNav as unknown as ComponentType<TabNavProps>;
