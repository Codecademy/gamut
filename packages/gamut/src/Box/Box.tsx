import { styledConfig } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { BoxProps, boxProps, sharedStates } from './props';

export const Box = styled('div', styledConfig)<BoxProps>(
  sharedStates,
  boxProps
);

export type { BoxProps } from './props';
