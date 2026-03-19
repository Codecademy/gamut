import { system, useVariance } from '@codecademy/gamut-styles';
import { ElementType, forwardRef } from 'react';

import { boxProps, GridBoxProps, gridStates, sharedStates } from './props';

export const GridBox = forwardRef<
  HTMLElement,
  GridBoxProps & { as?: ElementType }
>(({ as: As = 'div' as ElementType, ...props }, ref) => {
  const { rest } = useVariance(
    props,
    system.css({ display: 'grid' }),
    sharedStates,
    gridStates,
    boxProps
  );
  return <As ref={ref} {...rest} />;
});
