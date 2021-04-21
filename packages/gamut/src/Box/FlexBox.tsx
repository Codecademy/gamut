import { styledConfig, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { BoxProps, boxProps } from './props';

export const FlexBox = styled('div', styledConfig)<BoxProps>(
  system.css({ display: 'flex' }),
  system.variant({
    variants: {
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  }),
  boxProps
);
