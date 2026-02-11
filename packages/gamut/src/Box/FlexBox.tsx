import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { type ComponentProps } from 'react';

import {
  boxProps,
  FlexBoxProps,
  flexStates,
  sharedStates,
} from './props';

const StyledFlexBox = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

type FlexBoxIntrinsicElementRef<C extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[C] extends React.HTMLAttributes<infer E>
    ? E
    : HTMLElement;

/** Props when rendering as intrinsic element C. Export for consumers to type polymorphic usage. */
export type FlexBoxPolymorphicProps<
  C extends keyof React.JSX.IntrinsicElements = 'div'
> = Omit<FlexBoxProps, 'as'> &
  React.JSX.IntrinsicElements[C] & {
    as?: C;
  } & React.RefAttributes<FlexBoxIntrinsicElementRef<C> | null>;

/** Omit ref so we don't intersect with StyledFlexBox's ref (React 19: accept RefObject<El | null>). */
type FlexBoxDefaultProps = Omit<ComponentProps<typeof StyledFlexBox>, 'ref'> &
  React.RefAttributes<HTMLDivElement | null>;

/** Polymorphic call signatures so as="img"|"form"|"input" accept intrinsic props. */
interface FlexBoxPolymorphicComponent {
  (props: FlexBoxPolymorphicProps<'img'>): React.ReactElement;
  (props: FlexBoxPolymorphicProps<'form'>): React.ReactElement;
  (props: FlexBoxPolymorphicProps<'input'>): React.ReactElement;
  (props: FlexBoxDefaultProps): React.ReactElement;
  /** Return type accepts intrinsic props for C (e.g. withComponent('img') accepts src, alt, loading). */
  withComponent: <C extends keyof React.JSX.IntrinsicElements>(
    as: C
  ) => React.ForwardRefExoticComponent<
    Omit<FlexBoxProps, 'as'> &
      React.JSX.IntrinsicElements[C] &
      React.RefAttributes<FlexBoxIntrinsicElementRef<C> | null>
  >;
}

export const FlexBox = StyledFlexBox as unknown as FlexBoxPolymorphicComponent;

export type { FlexBoxProps } from './props';
