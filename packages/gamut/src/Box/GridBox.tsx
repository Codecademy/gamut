import { styledConfig, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { BoxProps, boxProps } from './props';

export const GridBox = styled('div', styledConfig)<BoxProps>(
  system.css({ display: 'grid' }),
  boxProps
);
