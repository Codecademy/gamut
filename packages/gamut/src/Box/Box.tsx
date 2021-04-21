import { styledConfig } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps } from './props';

export const Box = styled('div', styledConfig)(boxProps);

export type { BoxProps } from './props';
