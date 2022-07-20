import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PlainLi = styled.li(
  css({
    '&:before': {
      display: 'none !important',
    },
  })
);
