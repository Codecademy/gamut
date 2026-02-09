import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { type ComponentProps } from 'react';

import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

const StyledFlexBox = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

/** Type-only: widens ref to Ref<HTMLDivElement | null> for React 18/19 compatibility. */
type FlexBoxWithNullableRef = React.ForwardRefExoticComponent<
  ComponentProps<typeof StyledFlexBox> &
    React.RefAttributes<HTMLDivElement | null>
> & {
  withComponent: <C extends keyof React.JSX.IntrinsicElements>(
    as: C
  ) => React.ForwardRefExoticComponent<
    ComponentProps<typeof StyledFlexBox> &
      React.RefAttributes<HTMLElement | null>
  >;
};

export const FlexBox = StyledFlexBox as unknown as FlexBoxWithNullableRef;

export type { FlexBoxProps } from './props';
