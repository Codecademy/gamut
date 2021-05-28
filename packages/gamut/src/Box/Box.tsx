import { styledConfig } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps, sharedStates } from './props';

export const Box = styled('div', styledConfig)(boxProps, sharedStates);

export type { BoxProps } from './props';
