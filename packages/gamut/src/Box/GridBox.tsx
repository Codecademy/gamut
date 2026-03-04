import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import type { CompatibleStyledComponentProps } from '../utils/types';
import { asCompatibleForwardRefComponentWithStyled } from '../utils/types';
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

export const GridBox = asCompatibleForwardRefComponentWithStyled<
  CompatibleStyledComponentProps<typeof StyledGridBox, HTMLDivElement>,
  typeof StyledGridBox
>(StyledGridBox);
