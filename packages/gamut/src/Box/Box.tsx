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
  C extends keyof React.JSX.IntrinsicElements = 'div'
> = Omit<BoxProps, 'as'> &
  React.JSX.IntrinsicElements[C] & {
    as?: C;
  } & React.RefAttributes<BoxIntrinsicElementRef<C> | null>;

/** Omit ref so we don't intersect with StyledBox's ref (React 19: accept RefObject<El | null>). */
type BoxDefaultProps = Omit<ComponentProps<typeof StyledBox>, 'ref'> &
  React.RefAttributes<HTMLDivElement | null>;

/** Polymorphic call signatures so as="img"|"form"|"input" accept intrinsic props (src, alt, action, name, etc.). */
interface BoxPolymorphicComponent {
  (props: BoxPolymorphicProps<'img'>): React.ReactElement;
  (props: BoxPolymorphicProps<'form'>): React.ReactElement;
  (props: BoxPolymorphicProps<'input'>): React.ReactElement;
  (props: BoxDefaultProps): React.ReactElement;
  withComponent: <C extends keyof React.JSX.IntrinsicElements>(
    as: C
  ) => React.ForwardRefExoticComponent<
    ComponentProps<typeof StyledBox> & React.RefAttributes<HTMLElement | null>
  >;
}

export const Box = StyledBox as unknown as BoxPolymorphicComponent;

export type { BoxProps } from './props';
