import { Background, styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { useTabListState } from '@react-stately/tabs';
import * as React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerVariants } from './styles';
import { TabProvider } from './TabProvider';

export interface TabsBaseProps
  extends StyleProps<typeof tabContainerVariants>,
    TabElementStyleProps {}

export interface TabsProps extends TabsBaseProps {}

type TabStateProps = {};

const TabsBase = styled(
  'div',
  styledOptions
)<TabsBaseProps>(tabElementBaseProps);

export const Tabs: React.FC<TabsProps> = ({ variant, props }) => {
  const state = useTabListState(props);
  return (
    <TabProvider value={{ variant: variant || 'standard', state }}>
      {/* currently only supporting dark mode for the LE variant */}
      {variant === 'block' ? (
        <Background bg="navy-800" height="100%">
          <TabsBase
            position="relative"
            zIndex={0}
            // keyboardActivation={TabsKeyboardActivation.Manual}
            {...props}
          />
        </Background>
      ) : (
        <TabsBase
          position="relative"
          zIndex={0}
          // keyboardActivation={TabsKeyboardActivation.Manual}
          {...props}
        />
      )}
    </TabProvider>
  );
};
