import { css, Global } from '@emotion/react';
import React from 'react';

import { useColorModes } from '../ColorMode';

export const Scrollbars = () => {
  const [, activeColors, , getColorValue] = useColorModes();

  return (
    <Global
      styles={css`
  * {
    scrollbar-width: auto;
    scrollbar-color: var(--color-text) var(--color-background);
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: var(--color-background)};
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--color-background);
    border-radius: 20px;
    border: 3px solid var(--color-text);
  }
`}
    />
  );
};
