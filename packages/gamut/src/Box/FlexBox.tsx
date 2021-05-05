import { styledConfig, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps, FlexBoxProps } from './props';

export const FlexBox = styled('div', styledConfig)<FlexBoxProps>(
  system.css({ display: 'flex' }),
  boxProps
);
