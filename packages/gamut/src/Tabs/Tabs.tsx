import { Background } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';
import {
  Tabs as ReactAriaTabs,
  TabsProps as ReactAriaTabsProps,
} from 'react-aria-components';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerVariants } from './styles';
import { TabProvider } from './TabProvider';

export interface TabsBaseProps
  extends StyleProps<typeof tabContainerVariants>,
    TabElementStyleProps {}

export interface TabsProps extends TabsBaseProps, ReactAriaTabsProps {}

const TabsBase = styled(ReactAriaTabs)<TabsProps>(tabElementBaseProps);

export const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <TabProvider value={{ variant: props.variant || 'standard' }}>
      {/* currently only supporting dark mode for the LE variant. */}
      {props.variant === 'block' ? (
        <Background bg="navy-800" height="100%">
          <TabsBase position="relative" zIndex={0} {...props} />
        </Background>
      ) : (
        <TabsBase position="relative" zIndex={0} {...props} />
      )}
    </TabProvider>
  );
};
