import { css } from '@emotion/react';
import styled from '@emotion/styled';

// This ia a topgap measure until  Markdown V2 and we can effecitvely deprecate all css + scss. See WEB-1776 for more details.

export const PlainLi = styled.li(
  css({
    '&:before': {
      display: 'none !important',
    },
  })
);
