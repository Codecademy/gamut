import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { type ComponentProps } from 'react';

import { boxProps, GridBoxProps, gridStates, sharedStates } from './props';

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
  C extends keyof React.JSX.IntrinsicElements = 'div',
> = Omit<GridBoxProps, 'as'> &
  React.JSX.IntrinsicElements[C] & {
    as?: C;
  } & React.RefAttributes<GridBoxIntrinsicElementRef<C> | null>;

/** Type-only: widens ref to Ref<HTMLDivElement | null> for React 18/19 compatibility. */
type GridBoxWithNullableRef = React.ForwardRefExoticComponent<
  ComponentProps<typeof StyledGridBox> &
    React.RefAttributes<HTMLDivElement | null>
> & {
  withComponent: <C extends keyof React.JSX.IntrinsicElements>(
    as: C,
  ) => React.ForwardRefExoticComponent<
    ComponentProps<typeof StyledGridBox> &
      React.RefAttributes<HTMLElement | null>
  >;
};

export const GridBox = StyledGridBox as unknown as GridBoxWithNullableRef;

export type { GridBoxProps } from './props';
