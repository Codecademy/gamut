import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import type { CompatibleStyledComponentProps } from '../utils/types';
import { asCompatibleForwardRefComponentWithStyled } from '../utils/types';
import { BoxProps, boxProps, sharedStates } from './props';

const StyledBox = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export const Box: React.ForwardRefExoticComponent<
  CompatibleStyledComponentProps<typeof StyledBox, HTMLDivElement>
> &
  Pick<typeof StyledBox, 'withComponent'> =
  asCompatibleForwardRefComponentWithStyled<
    CompatibleStyledComponentProps<typeof StyledBox, HTMLDivElement>,
    typeof StyledBox
  >(StyledBox);

export type { BoxProps } from './props';
