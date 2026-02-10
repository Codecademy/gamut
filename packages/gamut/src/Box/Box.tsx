import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { BoxProps, boxProps, ForwardRefStyledDivComponent, sharedStates } from './props';

const StyledBox = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

/** Element type for intrinsic tag C (for ref typing). */
type BoxIntrinsicElementRef<C extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[C] extends React.HTMLAttributes<infer E>
    ? E
    : HTMLElement;

/** Props when rendering as intrinsic element C (e.g. as="img" accepts src, alt, etc.). Export for consumers (e.g. portal-app) to type polymorphic usage. */
export type BoxPolymorphicProps<
  C extends keyof React.JSX.IntrinsicElements = 'div'
> = Omit<BoxProps, 'as'> &
  React.JSX.IntrinsicElements[C] & {
    as?: C;
  } & React.RefAttributes<BoxIntrinsicElementRef<C> | null>;

export const Box = StyledBox as unknown as ForwardRefStyledDivComponent<
  typeof StyledBox
>;

export type { BoxProps } from './props';
