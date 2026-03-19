import { useVariance } from '@codecademy/gamut-styles';
import { forwardRef } from 'react';
import * as React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';

export interface TabPanelsProps extends TabElementStyleProps {}

export const TabPanels = forwardRef<
  HTMLDivElement,
  TabPanelsProps & React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { rest } = useVariance(props as Record<string, unknown>, tabElementBaseProps);
  return <div ref={ref} {...rest} />;
});
