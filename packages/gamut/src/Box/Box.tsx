import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import type { CompatibleStyledComponentProps } from '../utils/types';
import { asCompatibleForwardRefComponentWithStyled } from '../utils/types';
import { BoxProps, boxProps, sharedStates } from './props';

const StyledBox = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export const Box = asCompatibleForwardRefComponentWithStyled<
  CompatibleStyledComponentProps<typeof StyledBox, HTMLDivElement>,
  typeof StyledBox
>(StyledBox);

export type { BoxProps } from './props';
