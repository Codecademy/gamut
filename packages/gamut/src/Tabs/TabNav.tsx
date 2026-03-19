import { useVariance } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { forwardRef } from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';

export interface TabNavProps
  extends StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

export const TabNav = forwardRef<HTMLElement, TabNavProps>((props, ref) => {
  const { rest } = useVariance(
    props as Record<string, unknown>,
    tabElementBaseProps,
    tabContainerVariants,
    tabContainerStates
  );
  return <nav ref={ref} {...rest} />;
});
