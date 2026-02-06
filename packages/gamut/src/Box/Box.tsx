import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { type ComponentProps } from 'react';

import { BoxProps, boxProps, sharedStates } from './props';

const StyledBox = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

/** Type-only: widens ref to Ref<HTMLDivElement | null> for React 18/19 compatibility. */
type BoxWithNullableRef = React.ForwardRefExoticComponent<
  ComponentProps<typeof StyledBox> & React.RefAttributes<HTMLDivElement | null>
> & {
  withComponent: <C extends keyof JSX.IntrinsicElements>(
    as: C
  ) => React.ForwardRefExoticComponent<
    ComponentProps<typeof StyledBox> & React.RefAttributes<HTMLElement | null>
  >;
};

export const Box = StyledBox as unknown as BoxWithNullableRef;

export type { BoxProps } from './props';
