import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import {
  asCompatibleForwardRefComponent,
  CompatibleStyledComponentProps,
} from '../utils';
import { BoxProps, boxProps, sharedStates } from './props';

const StyledBox = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export const Box =
  asCompatibleForwardRefComponent<CompatibleStyledComponentProps<
    typeof StyledBox,
    HTMLDivElement
  >>(StyledBox);

export type { BoxProps } from './props';
