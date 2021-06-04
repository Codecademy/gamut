import { fontSmoothPixel, system, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { config } from './shared';
import { ButtonProps } from './types';

export const ButtonInner = styled('span', config)<ButtonProps>(
  fontSmoothPixel,
  system.css({
    border: 2,
    width: '100%',
    borderRadius: '4px',
    borderColor: 'transparent',
    display: 'inline-block',
    fontWeight: 'title',
    textAlign: 'center',
    transition: ` ${timing.fast} background-color, ${timing.fast} box-shadow,
    ${timing.fast} color`,
    '&:before, &:after': {
      content: '""',
      display: 'inline-block',
      width: '1px',
      height: 1,
      marginLeft: '-1px',
      marginRight: '-1px',
      verticalAlign: 'middle',
    },
    '> *': {
      verticalAlign: 'middle',
    },
  })
);
