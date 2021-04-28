import { css, Global } from '@emotion/react';
import React from 'react';

import { theme } from '../theme';

const scrollbarSettings = css`
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: calc(0.6rem);
  }
`;

export const scrollbarColors = css`
  scrollbar-color: ${theme.colors.scrollbarThumb} transparent;

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.scrollbarThumb};
  }
`;

const scrollbarStyles = css(scrollbarColors, scrollbarSettings);

export const Scrollbars = () => <Global styles={scrollbarStyles} />;
