import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const BarsList = styled('ul')(
  css({
    p: 0,
    listStyle: 'none',
    '& li:nth-of-type(even)': {
      bg: 'background-selected',
    },
  })
);
