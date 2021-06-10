import { styledConfig, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps, GridBoxProps, gridStates, sharedStates } from './props';

export const GridBox = styled('div', styledConfig)<GridBoxProps>(
  system.css({ display: 'grid' }),
  sharedStates,
  gridStates,
  boxProps
);
