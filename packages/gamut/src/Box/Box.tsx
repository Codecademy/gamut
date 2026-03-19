import { useVariance } from '@codecademy/gamut-styles';
import { ElementType, forwardRef } from 'react';

import { BoxProps, boxProps, sharedStates } from './props';

export const Box = forwardRef<HTMLElement, BoxProps & { as?: ElementType }>(
  ({ as: As = 'div' as ElementType, ...props }, ref) => {
    const { rest } = useVariance(props, sharedStates, boxProps);
    return <As ref={ref} {...rest} />;
  }
);

export type { BoxProps } from './props';
