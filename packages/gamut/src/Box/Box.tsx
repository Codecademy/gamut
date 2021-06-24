import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { BoxProps, boxProps, sharedStates } from './props';

export const Box = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export type { BoxProps } from './props';
