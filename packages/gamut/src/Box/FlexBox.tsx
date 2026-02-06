import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { type ComponentProps, forwardRef, type LegacyRef } from 'react';

import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

const StyledFlexBox = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

export const FlexBox = forwardRef<
  HTMLDivElement | null,
  ComponentProps<typeof StyledFlexBox>
>((props, ref) => (
  <StyledFlexBox {...props} ref={ref as LegacyRef<HTMLDivElement>} />
));

export type { FlexBoxProps } from './props';
