import { css, Global } from '@emotion/react';
import React from 'react';

import { useColorModes } from '../ColorMode';

export const Scrollbars = () => {
  const [, activeColors, , getColorValue] = useColorModes();

  return (
    <Global
      styles={css`
        * {
          scrollbar-color: ${getColorValue(activeColors.scrollbar)}
            ${getColorValue(activeColors['background-primary'])};
          scrollbar-width: thin;
        }

        /* Works on Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          background: transparent;
          width: 12px;
        }

        *::-webkit-scrollbar-track {
          background: ${getColorValue(activeColors['background-primary'])};
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${getColorValue(activeColors.scrollbar)};
          border-radius: 20px;
          border: 3px solid ${getColorValue(activeColors['background-primary'])};
        }
      `}
    />
  );
};
