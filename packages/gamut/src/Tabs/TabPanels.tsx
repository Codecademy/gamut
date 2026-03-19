import styled from '@emotion/styled';
import type { ComponentType } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelsProps
  extends TabElementStyleProps,
    ComponentPropsWithoutRef<'div'> {}

const StyledTabPanels = styled('div')<TabPanelsProps>(tabElementBaseProps);

export const TabPanels =
  StyledTabPanels as unknown as ComponentType<TabPanelsProps>;
