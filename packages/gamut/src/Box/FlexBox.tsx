import { css, useVariance } from '@codecademy/gamut-styles';
import { ElementType, forwardRef } from 'react';

import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

export const FlexBox = forwardRef<
  HTMLElement,
  FlexBoxProps & { as?: ElementType }
>(({ as: As = 'div' as ElementType, ...props }, ref) => {
  const { rest } = useVariance(
    props,
    css({ display: 'flex' }),
    sharedStates,
    flexStates,
    boxProps
  );
  return <As ref={ref} {...rest} />;
});

export type { FlexBoxProps } from './props';
