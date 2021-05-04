import { css, Global } from '@emotion/react';
import React from 'react';

import { theme } from '../theme';

const scrollbarSettings = css`
  scrollbar-width: thin;

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: ${theme.spacing[8]};
    height: ${theme.spacing[8]};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: ${theme.spacing[8]};
  }
`;

/** These are separate styles as they must be scoped to color mode */
export const scrollbarColors = css`
  scrollbar-color: ${theme.colors.scrollbarThumb} transparent;

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.scrollbarThumb};
  }
`;

const scrollbarStyles = css(scrollbarColors, scrollbarSettings);

export const Scrollbars = () => <Global styles={scrollbarStyles} />;
