import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { type ComponentProps } from 'react';

import { BoxProps, boxProps, sharedStates } from './props';

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
  C extends keyof React.JSX.IntrinsicElements = 'div',
> = Omit<BoxProps, 'as'> &
  React.JSX.IntrinsicElements[C] & {
    as?: C;
  } & React.RefAttributes<BoxIntrinsicElementRef<C> | null>;

/** Type-only: widens ref to Ref<HTMLDivElement | null> for React 18/19 compatibility. */
type BoxWithNullableRef = React.ForwardRefExoticComponent<
  ComponentProps<typeof StyledBox> & React.RefAttributes<HTMLDivElement | null>
> & {
  withComponent: <C extends keyof React.JSX.IntrinsicElements>(
    as: C,
  ) => React.ForwardRefExoticComponent<
    ComponentProps<typeof StyledBox> & React.RefAttributes<HTMLElement | null>
  >;
};

export const Box = StyledBox as unknown as BoxWithNullableRef;

export type { BoxProps } from './props';
