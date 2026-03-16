import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

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

export const GridBox: React.ForwardRefExoticComponent<
  CompatibleStyledComponentProps<typeof StyledGridBox, HTMLDivElement>
> &
  Pick<typeof StyledGridBox, 'withComponent'> =
  asCompatibleForwardRefComponentWithStyled<
    CompatibleStyledComponentProps<typeof StyledGridBox, HTMLDivElement>,
    typeof StyledGridBox
  >(StyledGridBox);
