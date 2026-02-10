import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import {
  boxProps,
  GridBoxProps,
  gridStates,
  ForwardRefStyledDivComponent,
  sharedStates,
} from './props';

const StyledGridBox = styled(
  'div',
  styledOptions(['fit', 'center', 'fitContent'])
)<GridBoxProps>(
  system.css({ display: 'grid' }),
  sharedStates,
  gridStates,
  boxProps
);

type GridBoxIntrinsicElementRef<C extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[C] extends React.HTMLAttributes<infer E>
    ? E
    : HTMLElement;

/** Props when rendering as intrinsic element C. Export for consumers to type polymorphic usage. */
export type GridBoxPolymorphicProps<
  C extends keyof React.JSX.IntrinsicElements = 'div'
> = Omit<GridBoxProps, 'as'> &
  React.JSX.IntrinsicElements[C] & {
    as?: C;
  } & React.RefAttributes<GridBoxIntrinsicElementRef<C> | null>;

export const GridBox = StyledGridBox as unknown as ForwardRefStyledDivComponent<
  typeof StyledGridBox
>;

export type { GridBoxProps } from './props';
