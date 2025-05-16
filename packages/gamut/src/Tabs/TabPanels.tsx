import styled from '@emotion/styled';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelsProps extends TabElementStyleProps {}

export const TabPanels = styled('div')<TabPanelsProps>(tabElementBaseProps);
