import { styledConfig, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps, GridBoxProps } from './props';

export const GridBox = styled('div', styledConfig)<GridBoxProps>(
  system.css({ display: 'grid' }),
  boxProps
);
