import { css } from '@emotion/react';

import { theme } from '../theme';

/** These are separate styles as they must be scoped to color mode */
export const scrollbarColors = css`
  scrollbar-color: ${theme.colors.scrollbarThumb} transparent;

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.scrollbarThumb};
  }
`;
