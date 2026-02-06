import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { type ComponentProps, forwardRef, type LegacyRef } from 'react';

import { BoxProps, boxProps, sharedStates } from './props';

const StyledBox = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export const Box = forwardRef<
  HTMLDivElement | null,
  ComponentProps<typeof StyledBox>
>((props, ref) => (
  <StyledBox {...props} ref={ref as LegacyRef<HTMLDivElement>} />
));

export type { BoxProps } from './props';
