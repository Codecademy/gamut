import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { type ComponentProps, forwardRef, type LegacyRef } from 'react';

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

export const GridBox = forwardRef<
  HTMLDivElement | null,
  ComponentProps<typeof StyledGridBox>
>((props, ref) => (
  <StyledGridBox {...props} ref={ref as LegacyRef<HTMLDivElement>} />
));

export type { GridBoxProps } from './props';
