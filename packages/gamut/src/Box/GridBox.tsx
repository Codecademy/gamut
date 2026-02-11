import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { type ComponentProps } from 'react';

import {
  boxProps,
  GridBoxProps,
  gridStates,
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

/** Omit ref so we don't intersect with StyledGridBox's ref (React 19: accept RefObject<El | null>). */
type GridBoxDefaultProps = Omit<ComponentProps<typeof StyledGridBox>, 'ref'> &
  React.RefAttributes<HTMLDivElement | null>;

/** Polymorphic call signatures so as="img"|"form"|"input" accept intrinsic props. */
interface GridBoxPolymorphicComponent {
  (props: GridBoxPolymorphicProps<'img'>): React.ReactElement;
  (props: GridBoxPolymorphicProps<'form'>): React.ReactElement;
  (props: GridBoxPolymorphicProps<'input'>): React.ReactElement;
  (props: GridBoxDefaultProps): React.ReactElement;
  /** Return type accepts intrinsic props for C (e.g. withComponent('img') accepts src, alt, loading). */
  withComponent: <C extends keyof React.JSX.IntrinsicElements>(
    as: C
  ) => React.ForwardRefExoticComponent<
    Omit<GridBoxProps, 'as'> &
      React.JSX.IntrinsicElements[C] &
      React.RefAttributes<GridBoxIntrinsicElementRef<C> | null>
  >;
}

export const GridBox = StyledGridBox as unknown as GridBoxPolymorphicComponent;

export type { GridBoxProps } from './props';
