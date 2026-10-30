import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps, GridBoxProps, gridStates, sharedStates } from './props';

export const GridBox = styled(
  'div',
  styledOptions(['fit', 'center', 'fitContent'])
)<GridBoxProps>(
  system.css({ display: 'grid' }),
  sharedStates,
  gridStates,
  boxProps
);

export type { GridBoxProps } from './props';
