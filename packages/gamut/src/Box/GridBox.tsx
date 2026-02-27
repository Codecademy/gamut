import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import {
  asCompatibleForwardRefComponent,
  CompatibleStyledComponentProps,
} from '../utils';
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

export const GridBox =
  asCompatibleForwardRefComponent<CompatibleStyledComponentProps<
    typeof StyledGridBox,
    HTMLDivElement
  >>(StyledGridBox);
